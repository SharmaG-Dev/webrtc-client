import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceData } from '@/hooks/useDeviceInfo'

interface DeviceState {
    isConnected: boolean
    devices: DeviceData[]
    selectedDevice: DeviceData | null
    deviceConnected: boolean | null
    isRegistering: boolean
    incomingConnections: Record<string, { name: string; ip: string }>
}

const initialState: DeviceState = {
    isConnected: false,
    devices: [],
    selectedDevice: null,
    deviceConnected: null,
    isRegistering: false,
    incomingConnections: {}
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDevices: (state, action: PayloadAction<DeviceData[]>) => {
            state.devices = action.payload
        },
        setSelectedDevice: (state, action: PayloadAction<DeviceData | null>) => {
            state.selectedDevice = action.payload
        },
        setDeviceConnected: (state, action: PayloadAction<boolean | null>) => {
            state.deviceConnected = action.payload
        },
        setIsRegistering: (state, action: PayloadAction<boolean>) => {
            state.isRegistering = action.payload
        },
        addIncomingConnection: (state, action: PayloadAction<{ ip: string; name: string }>) => {
            state.incomingConnections[action.payload.ip] = {
                name: action.payload.name,
                ip: action.payload.ip
            }
        },
        removeIncomingConnection: (state, action: PayloadAction<string>) => {
            delete state.incomingConnections[action.payload]
        },
        clearIncomingConnections: (state) => {
            state.incomingConnections = {}
        },
        clearDeviceState: (state) => {
            state.devices = []
            state.selectedDevice = null
            state.deviceConnected = null
            state.incomingConnections = {}
        },
        setIsConnected: (state, action:PayloadAction<boolean>) => {
            state.isConnected = action.payload
        }
    }
})

export const {
    setDevices,
    setSelectedDevice,
    setDeviceConnected,
    setIsRegistering,
    addIncomingConnection,
    removeIncomingConnection,
    clearIncomingConnections,
    clearDeviceState,
    setIsConnected
} = deviceSlice.actions

export default deviceSlice.reducer
