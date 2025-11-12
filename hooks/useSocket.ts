'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://werbrtc-server.onrender.com'

let socketInstance: Socket | null = null

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const getSocket = useCallback(() => {
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false, 
      })
    }
    return socketInstance
  }, [])

  useEffect(() => {
    const socket = getSocket()
    socketRef.current = socket

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [getSocket])

  const connect = useCallback(() => {
    socketRef.current?.connect()
  }, [])

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect()
  }, [])

  const emit = useCallback(<T,>(event: string, data?: T) => {
    socketRef.current?.emit(event, data)
  }, [])

  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback)
    return () => socketRef.current?.off(event, callback)
  }, [])
  const off = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.off(event, callback)
    return () => socketRef.current?.off(event, callback)
  }, [])


  return { socket: socketRef.current, isConnected, connect, disconnect, emit, on ,off }
}
