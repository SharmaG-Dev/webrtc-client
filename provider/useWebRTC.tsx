"use client"
import { useSocket } from "@/hooks/useSocket";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface MessageI {
    messageType: 'success' | 'error',
    message: string
}

interface WebRtcInterface {
    peerConnections: Map<string, RTCPeerConnection>;
    connectDevice: (deviceIp: string) => void;
    createOffer: (deviceIp: string) => Promise<RTCSessionDescriptionInit | void>;
    createAnswer: (deviceIp: string) => Promise<RTCSessionDescriptionInit | void>;
    pushMessage: (msg: MessageI) => void;
    removeMessage: (msg: MessageI) => void;
    message: MessageI[];
    connectedDevices: Set<string>;
    disconnectDevice: (deviceIp: string) => void;
}

export const WebRTCContext = createContext<WebRtcInterface | null>(null);

export const useWebRTC = () => {
    const context = useContext(WebRTCContext);

    if (!context) {
        throw new Error('useWebRTC must be used within a WebRtcProvider');
    }

    return context;
};

export const WebRtcProvider = ({ children }: { children: ReactNode }) => {
    const { emit, isConnected, on, off } = useSocket();
    const [message, setMessage] = useState<MessageI[]>([]);
    const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
    const [connectedDevices, setConnectedDevices] = useState<Set<string>>(new Set());

    const pushMessage = useCallback(({ message, messageType }: MessageI) => {
        setMessage(prev => [...prev, { message, messageType }]);

        // Auto-remove success messages after 5 seconds
        if (messageType === 'success') {
            setTimeout(() => {
                removeMessage({ message, messageType });
            }, 5000);
        }
    }, []);

    const removeMessage = useCallback(({ message, messageType }: MessageI) => {
        setMessage(prev => prev.filter(
            item => !(item.message === message && item.messageType === messageType)
        ));
    }, []);

    const connectDevice = useCallback(async (deviceIp: string) => {
        if (!isConnected) {
            pushMessage({ message: 'Socket is not connected', messageType: 'error' });
            return;
        }
        if (!deviceIp) {
            pushMessage({ message: 'Invalid device IP', messageType: 'error' });
            return;
        }
        if (peerConnections.has(deviceIp)) {
            console.log('Peer connection already exists for', deviceIp);
            return;
        }

        console.log('🔌 Creating peer connection for:', deviceIp);

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ],
            iceCandidatePoolSize: 10
        });

        // Connection state change listener
        peerConnection.addEventListener('connectionstatechange', () => {
            console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);

            switch (peerConnection.connectionState) {
                case 'connected':
                    console.log('✅ WebRTC connection established with:', deviceIp);
                    emit('webrtc-connected', { targetIp: deviceIp });
                    setConnectedDevices(prev => new Set(prev).add(deviceIp));
                    pushMessage({
                        message: `Connected to ${deviceIp}`,
                        messageType: 'success'
                    });
                    break;
                case 'disconnected':
                    console.log('⚠️ WebRTC connection disconnected:', deviceIp);
                    pushMessage({
                        message: `Disconnected from ${deviceIp}`,
                        messageType: 'error'
                    });
                    break;
                case 'failed':
                    console.log('❌ WebRTC connection failed:', deviceIp);
                    setConnectedDevices(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    emit('webrtc-disconnected', { targetIp: deviceIp });
                    pushMessage({
                        message: `Connection failed with ${deviceIp}`,
                        messageType: 'error'
                    });
                    break;
                case 'closed':
                    console.log('🔒 WebRTC connection closed:', deviceIp);
                    setConnectedDevices(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    emit('webrtc-disconnected', { targetIp: deviceIp });
                    break;
            }
        });

        // ICE connection state change listener
        peerConnection.addEventListener('iceconnectionstatechange', () => {
            console.log(`🧊 ICE connection state for ${deviceIp}: ${peerConnection.iceConnectionState}`);
        });

        // ICE candidate handler
        peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                console.log('🧊 Sending ICE candidate to:', deviceIp);
                emit('ice-candidate', {
                    targetIp: deviceIp,
                    candidate: event.candidate
                });
            }
        };

        const newPeerConnections = new Map(peerConnections);
        newPeerConnections.set(deviceIp, peerConnection);
        setPeerConnections(newPeerConnections);

    }, [isConnected, emit, peerConnections, pushMessage]);

    const createOffer = useCallback(async (deviceIp: string) => {
        if (!isConnected) {
            pushMessage({ message: 'Socket is not connected', messageType: 'error' });
            return;
        }
        if (!deviceIp) {
            pushMessage({ message: 'Invalid device IP', messageType: 'error' });
            return;
        }

        const peerConnection = peerConnections.get(deviceIp);
        if (!peerConnection) {
            pushMessage({ message: 'Peer connection not found', messageType: 'error' });
            return;
        }

        console.log('📤 Creating offer for:', deviceIp);
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        emit('offer', {
            targetIp: deviceIp,
            sdp: offer
        });

        return offer;
    }, [isConnected, peerConnections, emit, pushMessage]);

    const createAnswer = useCallback(async (deviceIp: string) => {
        if (!isConnected) {
            pushMessage({ message: 'Socket is not connected', messageType: 'error' });
            return;
        }
        if (!deviceIp) {
            pushMessage({ message: 'Invalid device IP', messageType: 'error' });
            return;
        }

        const peerConnection = peerConnections.get(deviceIp);
        if (!peerConnection) {
            pushMessage({ message: 'Peer connection not found', messageType: 'error' });
            return;
        }

        console.log('📥 Creating answer for:', deviceIp);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        emit('answer', {
            targetIp: deviceIp,
            sdp: answer
        });

        return answer;
    }, [isConnected, peerConnections, emit, pushMessage]);

    const disconnectDevice = useCallback((deviceIp: string) => {
        const peerConnection = peerConnections.get(deviceIp);

        if (peerConnection) {
            console.log('🔌 Closing peer connection for:', deviceIp);
            peerConnection.close();

            const newPeerConnections = new Map(peerConnections);
            newPeerConnections.delete(deviceIp);
            setPeerConnections(newPeerConnections);

            setConnectedDevices(prev => {
                const newSet = new Set(prev);
                newSet.delete(deviceIp);
                return newSet;
            });

            emit('webrtc-disconnected', { targetIp: deviceIp });
        }
    }, [peerConnections, emit]);

    useEffect(() => {
        if (!isConnected) {
            return;
        }

        // Handle incoming offer
        const handleOffer = async (data: { from: string; sdp: RTCSessionDescriptionInit }) => {
            const fromDeviceIp = data.from;
            console.log('📥 Received offer from:', fromDeviceIp);

            // Create peer connection if it doesn't exist
            if (!peerConnections.has(fromDeviceIp)) {
                await connectDevice(fromDeviceIp);
            }

            const peerConnection = peerConnections.get(fromDeviceIp);
            if (!peerConnection) {
                pushMessage({ message: 'Peer connection not found', messageType: 'error' });
                return;
            }

            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
            await createAnswer(fromDeviceIp);
        };

        // Handle incoming answer
        const handleAnswer = async (data: { from: string; sdp: RTCSessionDescriptionInit }) => {
            const fromDeviceIp = data.from;
            console.log('📥 Received answer from:', fromDeviceIp);

            const peerConnection = peerConnections.get(fromDeviceIp);
            if (!peerConnection) {
                pushMessage({ message: 'Peer connection not found', messageType: 'error' });
                return;
            }

            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
        };

        // Handle incoming ICE candidate
        const handleIceCandidate = async (data: { from: string; candidate: RTCIceCandidate }) => {
            const fromDeviceIp = data.from;
            console.log('🧊 Received ICE candidate from:', fromDeviceIp);

            const peerConnection = peerConnections.get(fromDeviceIp);
            if (!peerConnection) {
                pushMessage({ message: 'Peer connection not found for ICE candidate', messageType: 'error' });
                return;
            }

            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            } catch (err) {
                console.error("❌ Error adding ICE candidate:", err);
            }
        };

        // Handle connection notification from other device
        const handleWebRTCConnected = (data: { fromIp: string }) => {
            console.log('✅ Received connection notification from:', data.fromIp);
            setConnectedDevices(prev => new Set(prev).add(data.fromIp));
            pushMessage({
                message: `Connected to ${data.fromIp}`,
                messageType: 'success'
            });
        };

        // Handle disconnection notification
        const handleWebRTCDisconnected = (data: { fromIp: string }) => {
            console.log('❌ Received disconnection notification from:', data.fromIp);
            setConnectedDevices(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.fromIp);
                return newSet;
            });
        };

        on('offer', handleOffer);
        on('answer', handleAnswer);
        on('ice-candidate', handleIceCandidate);
        on('webrtc-connection-notify', handleWebRTCConnected);
        on('webrtc-disconnection-notify', handleWebRTCDisconnected);

        return () => {
            off('offer', handleOffer);
            off('answer', handleAnswer);
            off('ice-candidate', handleIceCandidate);
            off('webrtc-connection-notify', handleWebRTCConnected);
            off('webrtc-disconnection-notify', handleWebRTCDisconnected);
        };
    }, [isConnected, on, off, peerConnections, connectDevice, createAnswer, pushMessage]);

    return (
        <WebRTCContext.Provider value={{
            peerConnections,
            connectDevice,
            createAnswer,
            createOffer,
            removeMessage,
            pushMessage,
            message,
            connectedDevices,
            disconnectDevice
        }}>
            {children}
        </WebRTCContext.Provider>
    );
};
