'use client'

import { useCallback, useRef, useEffect, useState } from 'react'

interface UseWebRTCProps {
  emit: (event: string, data: any) => void
  on: (event: string, callback: (...args: any[]) => void) => () => void
  isSocketConnected: boolean
}

export function useWebRTC({ emit, on, isSocketConnected }: UseWebRTCProps) {
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map())
  const dataChannelsRef = useRef<Map<string, RTCDataChannel>>(new Map())
  const negotiatingRef = useRef<Set<string>>(new Set())
  // ✅ Store pending ICE candidates
  const pendingCandidatesRef = useRef<Map<string, RTCIceCandidateInit[]>>(new Map())
  
  const [connectionStatuses, setConnectionStatuses] = useState<Map<string, any>>(new Map())
  const [receivedMessages, setReceivedMessages] = useState<any[]>([])

  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ],
    iceCandidatePoolSize: 10
  }

  const updateConnectionStatus = useCallback((deviceIp: string, status: string) => {
    console.log(`📊 Status update for ${deviceIp}:`, status)
    setConnectionStatuses(prev => {
      const newMap = new Map(prev)
      newMap.set(deviceIp, { deviceIp, status })
      return newMap
    })
  }, [])

  const cleanupPeerConnection = useCallback((deviceIp: string) => {
    const pc = peerConnectionsRef.current.get(deviceIp)
    const dc = dataChannelsRef.current.get(deviceIp)

    if (dc) {
      dc.close()
      dataChannelsRef.current.delete(deviceIp)
    }

    if (pc) {
      pc.close()
      peerConnectionsRef.current.delete(deviceIp)
    }

    negotiatingRef.current.delete(deviceIp)
    pendingCandidatesRef.current.delete(deviceIp) // ✅ Clear pending candidates
    updateConnectionStatus(deviceIp, 'disconnected')
    console.log(`🧹 Cleaned up ${deviceIp}`)
  }, [updateConnectionStatus])

  // ✅ FIXED: Handle negotiation properly
  const handleNegotiationNeeded = useCallback(async (deviceIp: string, peerConnection: RTCPeerConnection) => {
    if (negotiatingRef.current.has(deviceIp)) {
      console.log(`⏳ Already negotiating for ${deviceIp}, skipping...`)
      return
    }

    // ✅ Check signaling state
    if (peerConnection.signalingState !== 'stable') {
      console.log(`⚠️ Signaling state not stable for ${deviceIp}: ${peerConnection.signalingState}`)
      return
    }

    negotiatingRef.current.add(deviceIp)
    console.log(`🔄 Negotiation needed for ${deviceIp}`)

    try {
      console.log(`📝 Creating offer for ${deviceIp}`)
      const offer = await peerConnection.createOffer()

      console.log(`📝 Setting local description for ${deviceIp}`)
      await peerConnection.setLocalDescription(offer)

      console.log(`📤 Sending offer to ${deviceIp}`)
      emit('offer', {
        targetIp: deviceIp,
        sdp: peerConnection.localDescription
      })

      console.log(`✅ Offer sent for ${deviceIp}`)
    } catch (error) {
      console.error(`❌ Negotiation error for ${deviceIp}:`, error)
      updateConnectionStatus(deviceIp, 'failed')
    } finally {
      // ✅ Remove negotiating flag after a delay
      setTimeout(() => {
        negotiatingRef.current.delete(deviceIp)
      }, 1000)
    }
  }, [emit, updateConnectionStatus])

  const connectToDevice = useCallback(async (device: any) => {
    const targetIp = device?.deviceInfo?.deviceIp
    if (!targetIp) {
      console.error('❌ No device IP found')
      throw new Error('No device IP found')
    }

    updateConnectionStatus(targetIp, 'connecting')

    if (peerConnectionsRef.current.has(targetIp)) {
      cleanupPeerConnection(targetIp)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const peerConnection = new RTCPeerConnection(iceServers)
    peerConnectionsRef.current.set(targetIp, peerConnection)

    // ✅ Create data channel
    const dataChannel = peerConnection.createDataChannel('fileChannel', {
      ordered: true,
      maxRetransmits: 10
    })
    dataChannelsRef.current.set(targetIp, dataChannel)

    // ✅ FIXED: Only handle negotiation when needed
    peerConnection.onnegotiationneeded = async () => {
      console.log(`🔄 negotiationneeded event for ${targetIp}`)
      await handleNegotiationNeeded(targetIp, peerConnection)
    }

    dataChannel.onopen = () => {
      console.log(`✅ Data channel opened for ${targetIp}`)
      updateConnectionStatus(targetIp, 'connected')
    }

    dataChannel.onclose = () => {
      console.log(`🔴 Data channel closed for ${targetIp}`)
      updateConnectionStatus(targetIp, 'disconnected')
    }

    dataChannel.onmessage = (event) => {
      console.log(`📦 Message from ${targetIp}:`, event.data)
      try {
        const parsed = JSON.parse(event.data)
        if (parsed.type === 'message') {
          setReceivedMessages(prev => [...prev, {
            from: targetIp,
            message: parsed.content,
            timestamp: Date.now()
          }])
        }
      } catch {}
    }

    dataChannel.onerror = (error) => {
      console.error(`❌ Channel error for ${targetIp}:`, error)
      updateConnectionStatus(targetIp, 'failed')
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`🌐 ICE candidate for ${targetIp}`)
        emit('ice-candidate', {
          targetIp,
          candidate: event.candidate
        })
      }
    }

    peerConnection.oniceconnectionstatechange = () => {
      const state = peerConnection.iceConnectionState
      console.log(`🔄 ICE state for ${targetIp}:`, state)

      if (state === 'connected' || state === 'completed') {
        updateConnectionStatus(targetIp, 'connected')
      } else if (state === 'failed' || state === 'disconnected') {
        updateConnectionStatus(targetIp, 'disconnected')
      }
    }

    // ✅ REMOVED: Don't manually trigger negotiation - let onnegotiationneeded handle it
    // The data channel creation will automatically trigger negotiationneeded

  }, [emit, updateConnectionStatus, cleanupPeerConnection, handleNegotiationNeeded, iceServers])

  const sendMessage = useCallback((deviceIp: string, message: string) => {
    const dataChannel = dataChannelsRef.current.get(deviceIp)
    
    if (!dataChannel || dataChannel.readyState !== 'open') {
      console.error(`❌ Channel not open for ${deviceIp}`)
      return false
    }

    dataChannel.send(JSON.stringify({
      type: 'message',
      content: message
    }))
    return true
  }, [])

  const disconnectFromDevice = useCallback((deviceIp: string) => {
    cleanupPeerConnection(deviceIp)
  }, [cleanupPeerConnection])

  const isDeviceConnected = useCallback((deviceIp: string) => {
    const status = connectionStatuses.get(deviceIp)
    return status?.status === 'connected'
  }, [connectionStatuses])

  // ✅ FIXED: Handle incoming offers
  useEffect(() => {
    if (!isSocketConnected) return

    const unsubscribeOffer = on('offer', async ({ from, sdp }: any) => {
      console.log(`📨 Offer received from ${from}`)
      updateConnectionStatus(from, 'connecting')

      if (peerConnectionsRef.current.has(from)) {
        cleanupPeerConnection(from)
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      const peerConnection = new RTCPeerConnection(iceServers)
      peerConnectionsRef.current.set(from, peerConnection)

      peerConnection.ondatachannel = (event) => {
        const channel = event.channel
        dataChannelsRef.current.set(from, channel)

        channel.onopen = () => {
          console.log(`✅ Channel opened (receiver) from ${from}`)
          updateConnectionStatus(from, 'connected')
        }

        channel.onmessage = (e) => {
          console.log(`📥 Message from ${from}:`, e.data)
          try {
            const parsed = JSON.parse(e.data)
            if (parsed.type === 'message') {
              setReceivedMessages(prev => [...prev, {
                from,
                message: parsed.content,
                timestamp: Date.now()
              }])
            }
          } catch {}
        }

        channel.onerror = (error) => {
          console.error(`❌ Channel error:`, error)
          updateConnectionStatus(from, 'failed')
        }
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          emit('ice-candidate', {
            targetIp: from,
            candidate: event.candidate
          })
        }
      }

      peerConnection.oniceconnectionstatechange = () => {
        const state = peerConnection.iceConnectionState
        console.log(`🔄 ICE state (receiver) ${from}:`, state)
        
        if (state === 'connected' || state === 'completed') {
          updateConnectionStatus(from, 'connected')
        } else if (state === 'failed' || state === 'disconnected') {
          updateConnectionStatus(from, 'disconnected')
        }
      }

      try {
        console.log(`📝 Setting remote (offer) for ${from}`)
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
        console.log(`✅ Remote set for ${from}`)

        // ✅ Process pending ICE candidates after setting remote description
        const pending = pendingCandidatesRef.current.get(from) || []
        for (const candidate of pending) {
          try {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            console.log(`✅ Added pending ICE candidate for ${from}`)
          } catch (error) {
            console.error(`❌ Error adding pending candidate:`, error)
          }
        }
        pendingCandidatesRef.current.delete(from)

        console.log(`📝 Creating answer for ${from}`)
        const answer = await peerConnection.createAnswer()
        console.log(`✅ Answer created for ${from}`)

        console.log(`📝 Setting local (answer) for ${from}`)
        await peerConnection.setLocalDescription(answer)
        console.log(`✅ Local set for ${from}`)

        console.log(`📤 Sending answer to ${from}`)
        emit('answer', {
          targetIp: from,
          sdp: peerConnection.localDescription
        })
        console.log(`✅ Answer sent to ${from}`)

      } catch (error) {
        console.error(`❌ Offer handling error for ${from}:`, error)
        updateConnectionStatus(from, 'failed')
        cleanupPeerConnection(from)
      }
    })

    return () => unsubscribeOffer()
  }, [isSocketConnected, emit, on, cleanupPeerConnection, updateConnectionStatus, iceServers])

  // ✅ Handle answers
  useEffect(() => {
    if (!isSocketConnected) return

    const unsubscribeAnswer = on('answer', async ({ from, sdp }: any) => {
      console.log(`💬 Answer received from ${from}`)

      const peerConnection = peerConnectionsRef.current.get(from)
      if (!peerConnection) {
        console.error(`❌ No PC found for ${from}`)
        return
      }

      try {
        console.log(`📝 Setting remote (answer) for ${from}`)
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
        console.log(`✅ Answer remote set for ${from}`)

        // ✅ Process pending ICE candidates after setting remote description
        const pending = pendingCandidatesRef.current.get(from) || []
        for (const candidate of pending) {
          try {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            console.log(`✅ Added pending ICE candidate for ${from}`)
          } catch (error) {
            console.error(`❌ Error adding pending candidate:`, error)
          }
        }
        pendingCandidatesRef.current.delete(from)

      } catch (error) {
        console.error(`❌ Answer error for ${from}:`, error)
        updateConnectionStatus(from, 'failed')
      }
    })

    return () => unsubscribeAnswer()
  }, [isSocketConnected, on, updateConnectionStatus])

  // ✅ FIXED: Handle ICE candidates with pending queue
  useEffect(() => {
    if (!isSocketConnected) return

    const unsubscribeICE = on('ice-candidate', async ({ from, candidate }: any) => {
      if (!candidate) return

      const peerConnection = peerConnectionsRef.current.get(from)
      if (!peerConnection) {
        console.log(`⚠️ No peer connection for ${from}, ignoring candidate`)
        return
      }

      try {
        // ✅ Check if remote description is set
        if (peerConnection.remoteDescription) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
          console.log(`✅ ICE candidate added for ${from}`)
        } else {
          // ✅ Queue candidate if remote description not set yet
          console.log(`⏳ Queueing ICE candidate for ${from} (no remote description yet)`)
          const pending = pendingCandidatesRef.current.get(from) || []
          pending.push(candidate)
          pendingCandidatesRef.current.set(from, pending)
        }
      } catch (error) {
        console.error(`❌ ICE error for ${from}:`, error)
      }
    })

    return () => unsubscribeICE()
  }, [isSocketConnected, on])

  useEffect(() => {
    return () => {
      peerConnectionsRef.current.forEach((_, deviceIp) => {
        cleanupPeerConnection(deviceIp)
      })
    }
  }, [cleanupPeerConnection])

  return {
    connectToDevice,
    disconnectFromDevice,
    sendMessage,
    isDeviceConnected,
    connectionStatuses,
    receivedMessages,
    clearMessages: () => setReceivedMessages([])
  }
}
