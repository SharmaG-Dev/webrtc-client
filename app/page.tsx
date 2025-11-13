'use client'

import { useEffect, useState, useCallback } from "react"
import { DeviceData, useDeviceInfo } from "@/hooks/useDeviceInfo"
import { useSocket } from "@/hooks/useSocket"
import { useWebRTC } from "@/provider/useWebRTC"

import { Loader2 } from "lucide-react"
import Header from "@/components/header"
import ConnectionStatus from "@/components/connectionStatus"
import NotificationBar from "@/components/notificationBar"
import DeviceList from "@/components/deviceList"
import ChatPanel from "@/components/chatPanel"

export default function Home() {
  const { isConnected: isSocketConnected, connect, disconnect, emit, on } = useSocket()
  const { deviceInfo, loading } = useDeviceInfo()
  const [deviceConnected, setDeviceConnected] = useState<boolean | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null)
  const [incomingConnections, setIncomingConnections] = useState<Map<string, { name: string, ip: string }>>(new Map())

  const {
    connectAndCreateOffer,
    message,
    connectedDevices,
    disconnectDevice,
    removeMessage,
    dataChannels
  } = useWebRTC()

  useEffect(() => {
    if (!isSocketConnected) return

    const handleIncomingConnection = (data: { fromIp: string, fromName?: string }) => {
      setIncomingConnections(prev => {
        const newMap = new Map(prev)
        newMap.set(data.fromIp, {
          name: data.fromName || 'Unknown Device',
          ip: data.fromIp
        })
        return newMap
      })
    }

    on('incoming-connection', handleIncomingConnection)
  }, [isSocketConnected, on])

  const allDevices = [
    ...devices,
    ...Array.from(incomingConnections.entries()).map(([ip, info]) => ({
      deviceInfo: {
        deviceIp: ip,
        name: info.name,
        deviceType: 'Web' as const,
        deviceModel: 'Unknown'
      },
      active: true,
      pairedDevices: []
    }))
  ]

  const uniqueDevices = allDevices.reduce((acc, device) => {
    const existingIndex = acc.findIndex(d => d.deviceInfo.deviceIp === device.deviceInfo.deviceIp)
    if (existingIndex === -1) {
      acc.push(device)
    }
    return acc
  }, [] as DeviceData[])

  const checkConnection = useCallback(() => {
    if (deviceInfo) {
      emit('check-connected', deviceInfo)
    }
  }, [emit, deviceInfo])

  const handleShowDevices = useCallback((data: DeviceData[]) => {
    setDevices(data)
  }, [])

  const handleCheckConnected = useCallback((status: boolean) => {
    setDeviceConnected(status)

    if (!status && !isRegistering) {
      setIsRegistering(true)
      emit("connect-device", deviceInfo)
      setTimeout(() => {
        checkConnection()
        setIsRegistering(false)
      }, 1000)
    }
  }, [isRegistering, emit, deviceInfo, checkConnection])

  useEffect(() => {
    if (!isSocketConnected || !deviceInfo) return

    const unsubscribeCheck = on("check-connected", handleCheckConnected)
    const unsubscribeDevices = on('show-devices', handleShowDevices)

    checkConnection()

    return () => {
      unsubscribeCheck()
      unsubscribeDevices()
    }
  }, [isSocketConnected, deviceInfo, on, handleCheckConnected, handleShowDevices, checkConnection])

  const handleToggleConnection = useCallback(() => {
    if (isSocketConnected) {
      disconnect()
      setDeviceConnected(null)
      setDevices([])
      setIncomingConnections(new Map())
      setSelectedDevice(null)
    } else {
      connect()
      setTimeout(() => emit('show-devices'), 1000)
    }
  }, [isSocketConnected, disconnect, connect, emit])

  const handleConnectDevice = useCallback(async (device: DeviceData) => {
    const deviceIp = device?.deviceInfo?.deviceIp
    if (!deviceIp) return
    
    try {
      await connectAndCreateOffer(deviceIp)
      setSelectedDevice(device)
    } catch (error) {
      console.error('❌ Failed to connect:', error)
    }
  }, [connectAndCreateOffer])

  const handleDisconnectDevice = useCallback((device: DeviceData) => {
    const deviceIp = device?.deviceInfo?.deviceIp
    if (!deviceIp) return

    disconnectDevice(deviceIp)
    
    if (selectedDevice?.deviceInfo?.deviceIp === deviceIp) {
      setSelectedDevice(null)
    }

    setIncomingConnections(prev => {
      const newMap = new Map(prev)
      newMap.delete(deviceIp)
      return newMap
    })
  }, [disconnectDevice, selectedDevice])

  const handleClearData = () => {
    emit('clear')
    setDevices([])
    setDeviceConnected(null)
    setIncomingConnections(new Map())
    setSelectedDevice(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="text-gray-700 font-medium">Loading device info...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header - Fixed height */}
      <div className="flex-shrink-0">
        <Header 
          isSocketConnected={isSocketConnected}
          onToggleConnection={handleToggleConnection}
          deviceInfo={deviceInfo}
        />
      </div>

      {/* Connection Status Bar - Fixed height */}
      <div className="flex-shrink-0">
        <ConnectionStatus 
          isSocketConnected={isSocketConnected}
          deviceConnected={deviceConnected}
          connectedDevicesCount={connectedDevices.size}
          isRegistering={isRegistering}
          onClearData={handleClearData}
          hasDevices={uniqueDevices.length > 0}
        />
      </div>

      {/* Notification Messages - Fixed height with scroll if needed */}
      {message.length > 0 && (
        <div className="flex-shrink-0 max-h-32 overflow-y-auto">
          <NotificationBar messages={message} onRemoveMessage={removeMessage} />
        </div>
      )}

      {/* Main Chat Layout - Fills remaining space */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel - Device List */}
        <div className={`${
          selectedDevice 
            ? 'hidden md:flex md:w-80 lg:w-96' 
            : 'w-full md:w-80 lg:w-96'
        } flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden`}>
          <DeviceList 
            devices={uniqueDevices}
            connectedDevices={connectedDevices}
            selectedDevice={selectedDevice}
            onSelectDevice={setSelectedDevice}
            onConnectDevice={handleConnectDevice}
            onDisconnectDevice={handleDisconnectDevice}
            isSocketConnected={isSocketConnected}
            isRegistering={isRegistering}
          />
        </div>

        {/* Right Panel - Chat Area */}
        <div className={`${
          selectedDevice 
            ? 'flex w-full' 
            : 'hidden md:flex md:flex-1'
        } overflow-hidden`}>
          <ChatPanel 
            selectedDevice={selectedDevice}
            dataChannel={selectedDevice ? dataChannels.get(selectedDevice.deviceInfo.deviceIp) || null : null}
            onDisconnect={() => selectedDevice && handleDisconnectDevice(selectedDevice)}
            onBack={() => setSelectedDevice(null)}
          />
        </div>
      </div>
    </div>
  )
}
