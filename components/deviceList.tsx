'use client'

import { DeviceData } from "@/hooks/useDeviceInfo"
import { Smartphone, Search } from "lucide-react"
import { useState } from "react"
import DeviceCard from "./deviceCard"

interface DeviceListProps {
  devices: DeviceData[]
  connectedDevices: Set<string>
  selectedDevice: DeviceData | null
  onSelectDevice: (device: DeviceData) => void
  onConnectDevice: (device: DeviceData) => void
  onDisconnectDevice: (device: DeviceData) => void
  isSocketConnected: boolean
  isRegistering: boolean
}

export default function DeviceList({
  devices,
  connectedDevices,
  selectedDevice,
  onSelectDevice,
  onConnectDevice,
  onDisconnectDevice,
  isSocketConnected,
  isRegistering
}: DeviceListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDevices = devices.filter(device =>
    device.deviceInfo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.deviceInfo.deviceIp?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Search Bar - Fixed at top */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Device Count - Fixed */}
      <div className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
        <p className="text-xs sm:text-sm font-medium text-gray-700">
          {filteredDevices.length} Device{filteredDevices.length !== 1 ? 's' : ''} Available
        </p>
      </div>

      {/* Device List - Scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        {filteredDevices.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredDevices.map((device, index) => (
              <DeviceCard
                key={index}
                device={device}
                isConnected={connectedDevices.has(device.deviceInfo.deviceIp)}
                isSelected={selectedDevice?.deviceInfo.deviceIp === device.deviceInfo.deviceIp}
                onSelect={() => onSelectDevice(device)}
                onConnect={() => onConnectDevice(device)}
                onDisconnect={() => onDisconnectDevice(device)}
              />
            ))}
          </div>
        ) : isSocketConnected && !isRegistering ? (
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mb-3" />
            <h3 className="text-sm font-semibold text-gray-700 mb-1">No Devices Found</h3>
            <p className="text-xs text-gray-500">
              {searchQuery ? 'No devices match your search' : 'Waiting for devices to connect...'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
            <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mb-3" />
            <p className="text-xs sm:text-sm text-gray-500">Connect to socket to see devices</p>
          </div>
        )}
      </div>
    </div>
  )
}
