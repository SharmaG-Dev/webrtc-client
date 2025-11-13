'use client'

import {  Loader2 } from "lucide-react"

interface ConnectionStatusProps {
  isSocketConnected: boolean
  deviceConnected: boolean | null
  connectedDevicesCount: number
  isRegistering: boolean
  onClearData: () => void
  hasDevices: boolean
}

export default function ConnectionStatus({
  isSocketConnected,
  deviceConnected,
  connectedDevicesCount,
  isRegistering,
  onClearData,
  hasDevices
}: ConnectionStatusProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 md:py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Status Indicators - Scrollable on very small screens */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide flex-1 min-w-0">
          {/* Socket Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${isSocketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-600 hidden sm:inline">Socket:</span>
            <span className={`text-xs sm:text-sm font-medium ${isSocketConnected ? 'text-green-600' : 'text-red-600'}`}>
              <span className="sm:hidden">{isSocketConnected ? '✓' : '✗'}</span>
              <span className="hidden sm:inline">{isSocketConnected ? 'Connected' : 'Disconnected'}</span>
            </span>
          </div>

          {/* Device Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${
              deviceConnected === null ? 'bg-yellow-500' : deviceConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-xs text-gray-600 hidden sm:inline">Device:</span>
            <span className={`text-xs sm:text-sm font-medium ${
              deviceConnected === null ? 'text-yellow-600' : deviceConnected ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="sm:hidden">
                {deviceConnected === null ? '...' : deviceConnected ? '✓' : '✗'}
              </span>
              <span className="hidden sm:inline">
                {deviceConnected === null ? 'Checking...' : deviceConnected ? 'Registered' : 'Not Registered'}
              </span>
            </span>
          </div>

          {/* WebRTC Connections */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${connectedDevicesCount > 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-xs text-gray-600 hidden md:inline">Chats:</span>
            <span className="text-xs sm:text-sm font-medium text-blue-600">{connectedDevicesCount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {isRegistering && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-blue-600">
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span className="text-xs sm:text-sm hidden md:inline">Registering...</span>
            </div>
          )}

          {hasDevices && (
            <button
              onClick={onClearData}
              className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium px-2 md:px-3 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
