'use client'

import { useEffect, useState, useCallback } from "react"
import { DeviceData, useDeviceInfo } from "@/hooks/useDeviceInfo"
import { useSocket } from "@/hooks/useSocket"
import { useWebRTC } from "@/hooks/useWebRTC"
import {
  Plug,
  Unplug,
  Smartphone,
  Loader2,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  Link2,
  Wifi,
  Monitor,
  Globe2,
  Send,
  MessageSquare
} from "lucide-react"

export default function Home() {
  const { isConnected: isSocketConnected, connect, disconnect, emit, on } = useSocket()
  const { deviceInfo, loading } = useDeviceInfo()
  const [deviceConnected, setDeviceConnected] = useState<boolean | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [messageInput, setMessageInput] = useState<{ [key: string]: string }>({})

  // Initialize WebRTC with renamed prop
  const { 
    connectToDevice, 
    disconnectFromDevice, 
    sendMessage, 
    isDeviceConnected,
    connectionStatuses,
    receivedMessages 
  } = useWebRTC({
    emit,
    on,
    isSocketConnected // Renamed to avoid conflict
  })

  // Check device connection status
  const checkConnection = useCallback(() => {
    if (deviceInfo) {
      emit('check-connected', deviceInfo)
    }
  }, [emit, deviceInfo])

  // Handle show devices event
  const handleShowDevices = useCallback((data: DeviceData[]) => {
    console.log('📱 Received devices:', data)
    setDevices(data)
  }, [])

  // Handle check connected response
  const handleCheckConnected = useCallback((status: boolean) => {
    console.log("✅ Received check-connected:", status)
    setDeviceConnected(status)

    if (!status && !isRegistering) {
      setIsRegistering(true)
      console.log("🔄 Device not found, registering...")

      emit("connect-device", deviceInfo)

      setTimeout(() => {
        checkConnection()
        setIsRegistering(false)
      }, 1000)
    }
  }, [isRegistering, emit, deviceInfo, checkConnection])

  // Socket connection effect
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

  // Toggle socket connection
  const handleToggleConnection = useCallback(() => {
    if (isSocketConnected) {
      disconnect()
      setDeviceConnected(null)
      setDevices([])
    } else {
      connect()
      setTimeout(() => emit('show-devices'), 1000)
    }
  }, [isSocketConnected, disconnect, connect, emit])

  // Handle WebRTC device connection
  const handleConnectDevice = useCallback(async (device: DeviceData) => {
    const deviceIp = device?.deviceInfo?.deviceIp

    if (!deviceIp) {
      console.error('❌ No device IP found')
      return
    }

    console.log('🔗 Connecting to device via WebRTC:', device)

    try {
      await connectToDevice(device)
      console.log('✅ Connection initiated for:', deviceIp)
    } catch (error) {
      console.error('❌ Failed to connect:', error)
    }
  }, [connectToDevice])

  // Handle WebRTC device disconnection
  const handleDisconnectDevice = useCallback((device: DeviceData) => {
    const deviceIp = device?.deviceInfo?.deviceIp
    if (!deviceIp) return

    console.log('🔌 Disconnecting from device:', deviceIp)
    disconnectFromDevice(deviceIp)
  }, [disconnectFromDevice])

  // Handle send message
  const handleSendMessage = useCallback((deviceIp: string) => {
    const message = messageInput[deviceIp]?.trim()
    if (!message) return

    const success = sendMessage(deviceIp, message)
    if (success) {
      setMessageInput(prev => ({ ...prev, [deviceIp]: '' }))
    }
  }, [messageInput, sendMessage])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Device Connection Manager
              </h1>
              <p className="text-gray-500 text-sm">
                Monitor and control your WebRTC device connections
              </p>
            </div>

            <button
              onClick={handleToggleConnection}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center space-x-2 ${
                isSocketConnected
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              {isSocketConnected ? (
                <>
                  <Unplug className="w-5 h-5" />
                  <span>Disconnect</span>
                </>
              ) : (
                <>
                  <Plug className="w-5 h-5" />
                  <span>Connect</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isSocketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Socket Status</p>
                <p className={`text-lg font-semibold flex items-center space-x-2 ${isSocketConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isSocketConnected ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Disconnected</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                deviceConnected === null ? 'bg-yellow-500' : deviceConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Device Status</p>
                <p className={`text-lg font-semibold flex items-center space-x-2 ${
                  deviceConnected === null ? 'text-yellow-600' : deviceConnected ? 'text-green-600' : 'text-red-600'
                }`}>
                  {deviceConnected === null ? (
                    <>
                      <Clock className="w-5 h-5" />
                      <span>Checking...</span>
                    </>
                  ) : deviceConnected ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Registered</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Not Registered</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${connectionStatuses.size > 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Active WebRTC</p>
                <p className="text-lg font-semibold text-blue-600">
                  {Array.from(connectionStatuses.values()).filter(s => s.status === 'connected').length} Connected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Inbox */}
        {receivedMessages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Received Messages</h2>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {receivedMessages.map((msg, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-blue-600">{msg.from}</span>
                    <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-gray-800">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isRegistering && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 flex items-center space-x-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-blue-700 font-medium">Registering device...</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <details className="group">
            <summary className="cursor-pointer p-6 font-semibold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>My Device Information</span>
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 pt-2">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200">
                {JSON.stringify(deviceInfo, null, 2)}
              </pre>
            </div>
          </details>
        </div>

        {/* Devices Grid */}
        {devices.length > 0 && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Available Devices</h2>
              <p className="text-gray-500 text-sm">
                {devices.length} device{devices.length !== 1 ? 's' : ''} found on the network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices?.map((item, index) => {
                const deviceIp = item?.deviceInfo?.deviceIp || ''
                const isWebRTCConnected = isDeviceConnected(deviceIp)
                const connectionStatus = connectionStatuses.get(deviceIp)

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`p-4 ${
                      isWebRTCConnected 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {item?.deviceInfo?.deviceType === 'Mobile' && <Smartphone className="w-6 h-6 text-white" />}
                          {item?.deviceInfo?.deviceType === 'PC' && <Monitor className="w-6 h-6 text-white" />}
                          {item?.deviceInfo?.deviceType === 'Web' && <Globe2 className="w-6 h-6 text-white" />}

                          <div>
                            <h3 className="text-white font-semibold text-lg">
                              {item?.deviceInfo?.name || 'Unknown Device'}
                            </h3>
                            <p className="text-blue-100 text-xs">
                              {item?.deviceInfo?.deviceType || 'Unknown Type'}
                            </p>
                          </div>
                        </div>

                        <div className={`w-3 h-3 rounded-full ${
                          isWebRTCConnected ? 'bg-white' : 'bg-green-400'
                        } animate-pulse`}></div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Smartphone className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Model</p>
                          <p className="text-sm font-medium">
                            {item?.deviceInfo?.deviceModel || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-700">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">IP Address</p>
                          <p className="text-sm font-medium font-mono">
                            {deviceIp || 'Not Available'}
                          </p>
                        </div>
                      </div>

                      {connectionStatus && (
                        <div className={`flex items-center space-x-2 rounded-lg p-2 ${
                          connectionStatus.status === 'connected' ? 'bg-green-50 border border-green-200' :
                          connectionStatus.status === 'connecting' ? 'bg-yellow-50 border border-yellow-200' :
                          'bg-red-50 border border-red-200'
                        }`}>
                          {connectionStatus.status === 'connected' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                          {connectionStatus.status === 'connecting' && <Loader2 className="w-4 h-4 text-yellow-600 animate-spin" />}
                          {connectionStatus.status === 'failed' && <XCircle className="w-4 h-4 text-red-600" />}
                          <span className="text-xs font-medium capitalize">
                            {connectionStatus.status}
                          </span>
                        </div>
                      )}

                      {/* Message Input - Only show when connected */}
                      {isWebRTCConnected && (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={messageInput[deviceIp] || ''}
                              onChange={(e) => setMessageInput(prev => ({ ...prev, [deviceIp]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(deviceIp)}
                              placeholder="Type a message..."
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => handleSendMessage(deviceIp)}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-200 my-3"></div>

                      {isWebRTCConnected ? (
                        <button
                          onClick={() => handleDisconnectDevice(item)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center space-x-2"
                        >
                          <Unplug className="w-4 h-4" />
                          <span>Disconnect</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConnectDevice(item)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center space-x-2"
                        >
                          <Link2 className="w-4 h-4" />
                          <span>Connect Device</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {devices.length === 0 && isSocketConnected && (
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
            <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Devices Found</h3>
            <p className="text-gray-500">
              Waiting for devices to connect to the network...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
