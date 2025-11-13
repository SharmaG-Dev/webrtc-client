'use client'

import { DeviceData } from "@/hooks/useDeviceInfo"
import { MessageSquare, AlertCircle } from "lucide-react"
import ChatWindow from "./chatWindow"

interface ChatPanelProps {
  selectedDevice: DeviceData | null
  dataChannel: RTCDataChannel | null
  onDisconnect: () => void
  onBack?: () => void
}

export default function ChatPanel({ selectedDevice, dataChannel, onDisconnect, onBack }: ChatPanelProps) {
  if (!selectedDevice) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-xl font-semibold text-gray-700 mb-2">No Device Selected</h3>
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            Select a device from the left panel to start chatting
          </p>
        </div>
      </div>
    )
  }

  if (!dataChannel || dataChannel.readyState !== 'open') {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-xl font-semibold text-gray-700 mb-2">Connecting...</h3>
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            Establishing connection with {selectedDevice.deviceInfo.name}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ChatWindow
      deviceName={selectedDevice.deviceInfo.name || 'Unknown Device'}
      deviceIp={selectedDevice.deviceInfo.deviceIp}
      deviceType={selectedDevice.deviceInfo.deviceType}
      dataChannel={dataChannel}
      onDisconnect={onDisconnect}
      onBack={onBack}
    />
  )
}
