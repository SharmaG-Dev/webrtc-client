'use client'

import { useEffect, useState, useCallback } from "react"
import { DeviceData, useDeviceInfo } from "@/hooks/useDeviceInfo"
import { useSocket } from "@/hooks/useSocket"
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
  AlertCircle
} from "lucide-react"
import { useWebRTC } from "@/provider/useWebRTC"

export default function Home() {
  const { isConnected: isSocketConnected, connect, disconnect, emit, on } = useSocket()
  const { deviceInfo, loading } = useDeviceInfo()
  const [deviceConnected, setDeviceConnected] = useState<boolean | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [devices, setDevices] = useState<DeviceData[]>([])

  const {
    peerConnections,
    connectDevice,
    createOffer,
    message,
    connectedDevices,
    disconnectDevice
  } = useWebRTC();

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
    
    try {
      await connectDevice(deviceIp)
      await createOffer(deviceIp)
      console.log('✅ Connection initiated for:', deviceIp)
    } catch (error) {
      console.error('❌ Failed to connect:', error)
    }
  }, [connectDevice, createOffer])

  // Handle WebRTC device disconnection
  const handleDisconnectDevice = useCallback((device: DeviceData) => {
    const deviceIp = device?.deviceInfo?.deviceIp
    if (!deviceIp) return

    console.log('🔌 Disconnecting from device:', deviceIp)
    disconnectDevice(deviceIp)
  }, [disconnectDevice])

  const handleClearData = () => {
    emit('clear')
    setDevices([])
    setDeviceConnected(null)
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

        {/* Message Notifications */}
        {message.length > 0 && (
          <div className="space-y-2">
            {message.map((msg:any, idx:number) => (
              <div
                key={idx}
                className={`rounded-lg p-4 flex items-center space-x-3 ${
                  msg.messageType === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {msg.messageType === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-medium ${
                    msg.messageType === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {msg.message}
                </span>
              </div>
            ))}
          </div>
        )}

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
              <div className={`w-3 h-3 rounded-full ${connectedDevices.size > 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Active WebRTC</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-blue-600">
                    {connectedDevices.size} Connected
                  </p>
                  {devices.length > 0 && (
                    <button 
                      onClick={handleClearData}
                      className="text-xs text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

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
                const isConnected = connectedDevices.has(item?.deviceInfo?.deviceIp);
                
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`p-4 ${
                      isConnected
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
                            <p className="text-white/80 text-xs">
                              {item?.deviceInfo?.deviceType || 'Unknown Type'}
                            </p>
                          </div>
                        </div>

                        <div className={`w-3 h-3 rounded-full ${
                          isConnected ? 'bg-white animate-pulse' : 'bg-green-400'
                        }`}></div>
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
                            {item?.deviceInfo?.deviceIp || 'Not Available'}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 my-3"></div>

                      {isConnected ? (
                        <div className="space-y-2">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              <span className="text-green-700 font-medium text-sm">Connected via WebRTC</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDisconnectDevice(item)}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center space-x-2"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Disconnect</span>
                          </button>
                        </div>
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
                );
              })}
            </div>
          </>
        )}

        {devices.length === 0 && isSocketConnected && !isRegistering && (
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
