"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "./useSocket";

interface MessageI { 
    messageType: 'success' | 'error', 
    message: string 
}

interface WebRtcInterface {
    peerConnections: Map<string, RTCPeerConnection>;
    connectAndCreateOffer: (deviceIp: string) => Promise<void>;
    createAnswer: (deviceIp: string) => Promise<RTCSessionDescriptionInit | void>;
    pushMessage: (msg: MessageI) => void;
    removeMessage: (msg: MessageI) => void;
    message: MessageI[];
    connectedDevices: Set<string>;
    disconnectDevice: (deviceIp: string) => void;
    dataChannels: Map<string, RTCDataChannel>;
}

export const WebRTCContext = createContext<WebRtcInterface | null>(null);

export const useWebRTC = (): WebRtcInterface => {
    const context = useContext(WebRTCContext);
    
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRtcProvider');
    }
    
    return context;
};

export const WebRtcProvider = ({ children }: { children: ReactNode }) => {
    const { emit, isConnected, on, off } = useSocket();
    const [message, setMessage] = useState<MessageI[]>([]);
    const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
    const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
    const [connectedDevices, setConnectedDevices] = useState<Set<string>>(new Set());
    const [dataChannels, setDataChannels] = useState<Map<string, RTCDataChannel>>(new Map());
    const dataChannelsRef = useRef<Map<string, RTCDataChannel>>(new Map());

    const pushMessage = useCallback(({ message, messageType }: MessageI) => {
        setMessage(prev => [...prev, { message, messageType }]);
        
        if (messageType === 'success') {
            setTimeout(() => {
                removeMessage({ message, messageType });
            }, 5000);
        }
    }, []);

    const removeMessage = useCallback(({ message, messageType }: MessageI) => {
        setMessage(prev => prev.filter(
            item => !(item.message === message && item.messageType === messageType)
        ));
    }, []);

    const setupPeerConnectionListeners = useCallback((peerConnection: RTCPeerConnection, deviceIp: string) => {
        // Connection state change listener
        peerConnection.addEventListener('connectionstatechange', () => {
            console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
            
            switch (peerConnection.connectionState) {
                case 'connected':
                    console.log('✅ WebRTC connection established with:', deviceIp);
                    emit('webrtc-connected', { targetIp: deviceIp });
                    setConnectedDevices(prev => new Set(prev).add(deviceIp));
                    pushMessage({ 
                        message: `Connected to ${deviceIp}`, 
                        messageType: 'success' 
                    });
                    break;
                case 'connecting':
                    console.log('🔄 Connecting to:', deviceIp);
                    break;
                case 'disconnected':
                    console.log('⚠️ WebRTC connection disconnected:', deviceIp);
                    setConnectedDevices(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    break;
                case 'failed':
                    console.log('❌ WebRTC connection failed:', deviceIp);
                    setConnectedDevices(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    emit('webrtc-disconnected', { targetIp: deviceIp });
                    pushMessage({ 
                        message: `Connection failed with ${deviceIp}`, 
                        messageType: 'error' 
                    });
                    break;
                case 'closed':
                    console.log('🔒 WebRTC connection closed:', deviceIp);
                    setConnectedDevices(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    emit('webrtc-disconnected', { targetIp: deviceIp });
                    break;
            }
        });

        // ICE connection state change listener
        peerConnection.addEventListener('iceconnectionstatechange', () => {
            console.log(`🧊 ICE connection state for ${deviceIp}: ${peerConnection.iceConnectionState}`);
        });

        // ICE gathering state change listener
        peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log(`📡 ICE gathering state for ${deviceIp}: ${peerConnection.iceGatheringState}`);
        });

        // Signaling state change listener
        peerConnection.addEventListener('signalingstatechange', () => {
            console.log(`📶 Signaling state for ${deviceIp}: ${peerConnection.signalingState}`);
        });

        // ICE candidate handler
        peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                console.log('🧊 Sending ICE candidate to:', deviceIp, event.candidate.type);
                emit('ice-candidate', {
                    targetIp: deviceIp,
                    candidate: event.candidate.toJSON()
                });
            } else {
                console.log('✅ ICE gathering complete for:', deviceIp);
            }
        };

        // DataChannel listener (for receiving side)
        peerConnection.addEventListener('datachannel', (event) => {
            console.log('📨 DataChannel received from:', deviceIp);
            const dataChannel = event.channel;
            
            setupDataChannelListeners(dataChannel, deviceIp);
            
            const newDataChannels = new Map(dataChannelsRef.current);
            newDataChannels.set(deviceIp, dataChannel);
            dataChannelsRef.current = newDataChannels;
            setDataChannels(newDataChannels);
        });

    }, [emit, pushMessage]);

    const setupDataChannelListeners = useCallback((dataChannel: RTCDataChannel, deviceIp: string) => {
        dataChannel.addEventListener('open', () => {
            console.log('✅ DataChannel opened for:', deviceIp);
            pushMessage({
                message: `Chat ready with ${deviceIp}`,
                messageType: 'success'
            });
        });

        dataChannel.addEventListener('close', () => {
            console.log('❌ DataChannel closed for:', deviceIp);
            const newDataChannels = new Map(dataChannelsRef.current);
            newDataChannels.delete(deviceIp);
            dataChannelsRef.current = newDataChannels;
            setDataChannels(newDataChannels);
        });

        dataChannel.addEventListener('error', (error) => {
            console.error('❌ DataChannel error:', error);
        });
    }, [pushMessage]);

    const connectAndCreateOffer = useCallback(async (deviceIp: string) => {
        if (!isConnected) {
            pushMessage({ message: 'Socket is not connected', messageType: 'error' });
            return;
        }
        if (!deviceIp) {
            pushMessage({ message: 'Invalid device IP', messageType: 'error' });
            return;
        }

        let peerConnection = peerConnectionsRef.current.get(deviceIp);
        
        if (!peerConnection) {
            console.log('🔌 Creating peer connection for:', deviceIp);

            peerConnection = new RTCPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' },
                    { urls: 'stun:stun2.l.google.com:19302' }
                ],
                iceCandidatePoolSize: 10
            });

            setupPeerConnectionListeners(peerConnection, deviceIp);

            // Create DataChannel (for initiating side)
            console.log('📨 Creating DataChannel for:', deviceIp);
            const dataChannel = peerConnection.createDataChannel('chat', {
                ordered: true
            });

            setupDataChannelListeners(dataChannel, deviceIp);

            const newDataChannels = new Map(dataChannelsRef.current);
            newDataChannels.set(deviceIp, dataChannel);
            dataChannelsRef.current = newDataChannels;
            setDataChannels(newDataChannels);

            // Update both ref and state
            const newPeerConnections = new Map(peerConnectionsRef.current);
            newPeerConnections.set(deviceIp, peerConnection);
            peerConnectionsRef.current = newPeerConnections;
            setPeerConnections(newPeerConnections);
        }

        try {
            console.log('📤 Creating offer for:', deviceIp);
            const offer = await peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            });
            
            console.log('📝 Setting local description (offer)');
            await peerConnection.setLocalDescription(offer);
            
            console.log('📤 Sending offer via socket');
            emit('offer', {
                targetIp: deviceIp,
                sdp: peerConnection.localDescription
            });
        } catch (error) {
            console.error('❌ Error creating offer:', error);
            pushMessage({ message: 'Failed to create offer', messageType: 'error' });
        }
    }, [isConnected, emit, pushMessage, setupPeerConnectionListeners, setupDataChannelListeners]);

    const createAnswer = useCallback(async (deviceIp: string) => {
        if (!isConnected) {
            pushMessage({ message: 'Socket is not connected', messageType: 'error' });
            return;
        }
        if (!deviceIp) {
            pushMessage({ message: 'Invalid device IP', messageType: 'error' });
            return;
        }

        const peerConnection = peerConnectionsRef.current.get(deviceIp);
        if (!peerConnection) {
            pushMessage({ message: 'Peer connection not found', messageType: 'error' });
            return;
        }

        try {
            console.log('📥 Creating answer for:', deviceIp);
            const answer = await peerConnection.createAnswer();
            
            console.log('📝 Setting local description (answer)');
            await peerConnection.setLocalDescription(answer);
            
            console.log('📤 Sending answer via socket');
            emit('answer', {
                targetIp: deviceIp,
                sdp: peerConnection.localDescription
            });

            return answer;
        } catch (error) {
            console.error('❌ Error creating answer:', error);
            pushMessage({ message: 'Failed to create answer', messageType: 'error' });
        }
    }, [isConnected, emit, pushMessage]);

    const disconnectDevice = useCallback((deviceIp: string) => {
        const peerConnection = peerConnectionsRef.current.get(deviceIp);
        const dataChannel = dataChannelsRef.current.get(deviceIp);
        
        if (dataChannel) {
            console.log('📨 Closing DataChannel for:', deviceIp);
            dataChannel.close();
            
            const newDataChannels = new Map(dataChannelsRef.current);
            newDataChannels.delete(deviceIp);
            dataChannelsRef.current = newDataChannels;
            setDataChannels(newDataChannels);
        }

        if (peerConnection) {
            console.log('🔌 Closing peer connection for:', deviceIp);
            peerConnection.close();
            
            const newPeerConnections = new Map(peerConnectionsRef.current);
            newPeerConnections.delete(deviceIp);
            peerConnectionsRef.current = newPeerConnections;
            setPeerConnections(newPeerConnections);
            
            setConnectedDevices(prev => {
                const newSet = new Set(prev);
                newSet.delete(deviceIp);
                return newSet;
            });

            emit('webrtc-disconnected', { targetIp: deviceIp });
        }
    }, [emit]);

    const createPeerConnectionIfNotExists = useCallback(async (deviceIp: string) => {
        if (peerConnectionsRef.current.has(deviceIp)) {
            return peerConnectionsRef.current.get(deviceIp);
        }

        console.log('🔌 Creating peer connection for incoming connection:', deviceIp);

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' }
            ],
            iceCandidatePoolSize: 10
        });

        setupPeerConnectionListeners(peerConnection, deviceIp);

        // Update both ref and state
        const newPeerConnections = new Map(peerConnectionsRef.current);
        newPeerConnections.set(deviceIp, peerConnection);
        peerConnectionsRef.current = newPeerConnections;
        setPeerConnections(newPeerConnections);

        return peerConnection;
    }, [setupPeerConnectionListeners]);

    useEffect(() => {
        if (!isConnected) {
            return;
        }

        // Handle incoming offer
        const handleOffer = async (data: { from: string; sdp: RTCSessionDescriptionInit }) => {
            const fromDeviceIp = data.from;
            console.log('📥 Received offer from:', fromDeviceIp);

            const peerConnection = await createPeerConnectionIfNotExists(fromDeviceIp);
            if (!peerConnection) {
                pushMessage({ message: 'Failed to create peer connection', messageType: 'error' });
                return;
            }

            try {
                console.log('📝 Setting remote description (offer)');
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                console.log('✅ Remote description set successfully');
                
                await createAnswer(fromDeviceIp);
            } catch (error) {
                console.error('❌ Error handling offer:', error);
                pushMessage({ message: 'Failed to handle offer', messageType: 'error' });
            }
        };

        // Handle incoming answer
        const handleAnswer = async (data: { from: string; sdp: RTCSessionDescriptionInit }) => {
            const fromDeviceIp = data.from;
            console.log('📥 Received answer from:', fromDeviceIp);

            const peerConnection = peerConnectionsRef.current.get(fromDeviceIp);
            if (!peerConnection) {
                console.error('❌ Peer connection not found for answer');
                pushMessage({ message: 'Peer connection not found', messageType: 'error' });
                return;
            }

            try {
                console.log('📝 Setting remote description (answer)');
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                console.log('✅ Remote description (answer) set successfully');
            } catch (error) {
                console.error('❌ Error handling answer:', error);
                pushMessage({ message: 'Failed to handle answer', messageType: 'error' });
            }
        };

        // Handle incoming ICE candidate
        const handleIceCandidate = async (data: { from: string; candidate: RTCIceCandidateInit }) => {
            const fromDeviceIp = data.from;
            console.log('🧊 Received ICE candidate from:', fromDeviceIp, data.candidate);

            const peerConnection = peerConnectionsRef.current.get(fromDeviceIp);
            if (!peerConnection) {
                console.error('❌ Peer connection not found for ICE candidate');
                return;
            }

            try {
                if (peerConnection.remoteDescription) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                    console.log('✅ ICE candidate added successfully');
                } else {
                    console.warn('⚠️ Remote description not set yet, queuing ICE candidate');
                    // Queue the candidate for later
                    setTimeout(async () => {
                        if (peerConnection.remoteDescription) {
                            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                            console.log('✅ Queued ICE candidate added successfully');
                        }
                    }, 100);
                }
            } catch (err) {
                console.error("❌ Error adding ICE candidate:", err);
            }
        };

        // Handle connection notification from other device
        const handleWebRTCConnected = (data: { fromIp: string }) => {
            console.log('✅ Received connection notification from:', data.fromIp);
            setConnectedDevices(prev => new Set(prev).add(data.fromIp));
        };

        // Handle disconnection notification
        const handleWebRTCDisconnected = (data: { fromIp: string }) => {
            console.log('❌ Received disconnection notification from:', data.fromIp);
            setConnectedDevices(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.fromIp);
                return newSet;
            });
        };

        on('offer', handleOffer);
        on('answer', handleAnswer);
        on('ice-candidate', handleIceCandidate);
        on('webrtc-connection-notify', handleWebRTCConnected);
        on('webrtc-disconnection-notify', handleWebRTCDisconnected);

        return () => {
            off('offer', handleOffer);
            off('answer', handleAnswer);
            off('ice-candidate', handleIceCandidate);
            off('webrtc-connection-notify', handleWebRTCConnected);
            off('webrtc-disconnection-notify', handleWebRTCDisconnected);
        };
    }, [isConnected, on, off, createAnswer, createPeerConnectionIfNotExists, pushMessage]);

    return (
        <WebRTCContext.Provider value={{ 
            peerConnections, 
            connectAndCreateOffer,
            createAnswer, 
            removeMessage, 
            pushMessage, 
            message,
            connectedDevices,
            disconnectDevice,
            dataChannels
        }}>
            {children}
        </WebRTCContext.Provider>
    );
};
