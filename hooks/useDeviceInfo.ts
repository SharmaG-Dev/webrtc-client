'use client'

import { useEffect, useState } from 'react'

export interface RegisterDevice {
  name: string
  deviceType: 'Mobile' | 'Web' | 'PC'
  deviceIp: string
  deviceModel?: string
}


export interface DeviceData {
    deviceInfo: RegisterDevice;
    pairedDevices: string[];
    active: boolean;
}


export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<RegisterDevice | null>(null)
  const [loading, setLoading] = useState(true)

  const getDeviceType = (): 'Mobile' | 'Web' | 'PC' => {
    const ua = navigator.userAgent
    if (/mobile/i.test(ua)) return 'Mobile'
    if (/windows|macintosh|linux/i.test(ua)) return 'PC'
    return 'Web'
  }

  const getDeviceIp = async (): Promise<string> => {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      return data.ip
    } catch {
      return 'Unknown'
    }
  }

  const getDeviceModel = (): string => {
    const ua = navigator.userAgent
    if (/iPhone/i.test(ua)) return 'iPhone'
    if (/iPad/i.test(ua)) return 'iPad'
    if (/Android/i.test(ua)) {
      const match = ua.match(/Android.*?;\s*(.*?)\s*(Build|\))/)
      return match ? match[1] : 'Android Device'
    }
    if (/Mac/i.test(ua)) return 'Mac'
    if (/Windows/i.test(ua)) return 'Windows PC'
    return 'Unknown'
  }

  const collectDeviceInfo = async (): Promise<RegisterDevice> => {
    const name = navigator.userAgent
    const deviceType = getDeviceType()
    const deviceModel = getDeviceModel()
    const deviceIp = await getDeviceIp()
    return { name, deviceType, deviceIp, deviceModel }
  }

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const info = await collectDeviceInfo()
      setDeviceInfo(info)
      setLoading(false)
    }

    fetchDeviceInfo()
  }, [])

  return { deviceInfo, loading }
}
