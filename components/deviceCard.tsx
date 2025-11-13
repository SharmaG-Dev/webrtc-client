'use client'

import { DeviceData } from "@/hooks/useDeviceInfo"
import { Smartphone, Monitor, Globe2, Wifi, CheckCircle2, Circle } from "lucide-react"

interface DeviceCardProps {
  device: DeviceData
  isConnected: boolean
  isSelected: boolean
  onSelect: () => void
  onConnect: () => void
  onDisconnect: () => void
}

export default function DeviceCard({
  device,
  isConnected,
  isSelected,
  onSelect,
  onConnect,
  onDisconnect
}: DeviceCardProps) {
  const getDeviceIcon = () => {
    switch (device.deviceInfo.deviceType) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
      case 'PC':
        return <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
      case 'Web':
        return <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
      default:
        return <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  }

  return (
    <div
      className={`p-3 sm:p-4 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 active:bg-gray-100'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
            isConnected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {getDeviceIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
              {device.deviceInfo.name || 'Unknown Device'}
            </h3>
            <p className="text-xs text-gray-500 truncate">{device.deviceInfo.deviceType || 'Unknown Type'}</p>
          </div>
        </div>
        {isConnected ? (
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
        ) : (
          <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-1 mb-2 sm:mb-3">
        <div className="flex items-center gap-2 text-xs">
          <Wifi className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 font-mono truncate">{device.deviceInfo.deviceIp || 'N/A'}</span>
        </div>
        <div className="text-xs text-gray-500 truncate pl-5">
          {device.deviceInfo.deviceModel || 'Unknown Model'}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          isConnected ? onDisconnect() : onConnect()
        }}
        className={`w-full py-1.5 sm:py-2 px-3 rounded-lg text-xs font-medium transition-all active:scale-95 ${
          isConnected
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  )
}
