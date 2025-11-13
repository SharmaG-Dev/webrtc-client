'use client'

import { Plug, Unplug, ChevronDown, Menu } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  isSocketConnected: boolean
  onToggleConnection: () => void
  deviceInfo: any
}

export default function Header({ isSocketConnected, onToggleConnection, deviceInfo }: HeaderProps) {
  const [showDeviceInfo, setShowDeviceInfo] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo/Title - Responsive sizing */}
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              WebRTC Chat
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1 hidden sm:block truncate">
              Real-time peer-to-peer communication
            </p>
          </div>

          {/* Actions - Responsive layout */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Device Info Dropdown - Hidden on mobile */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowDeviceInfo(!showDeviceInfo)}
                className="flex items-center space-x-2 px-3 md:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="hidden xl:inline">My Device</span>
                <Menu className="w-4 h-4 xl:hidden" />
                <ChevronDown className={`w-4 h-4 hidden xl:block transition-transform ${showDeviceInfo ? 'rotate-180' : ''}`} />
              </button>

              {showDeviceInfo && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDeviceInfo(false)}
                  />
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-80 xl:w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                    <h3 className="font-semibold text-gray-800 mb-2">Device Information</h3>
                    <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-96 overflow-y-auto">
                      {JSON.stringify(deviceInfo, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>

            {/* Connection Toggle Button - Responsive */}
            <button
              onClick={onToggleConnection}
              className={`px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm ${
                isSocketConnected
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              {isSocketConnected ? (
                <>
                  <Unplug className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Disconnect</span>
                </>
              ) : (
                <>
                  <Plug className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
