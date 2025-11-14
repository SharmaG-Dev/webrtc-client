(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/provider/useWebRTC.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebRTCContext",
    ()=>WebRTCContext,
    "WebRtcProvider",
    ()=>WebRtcProvider,
    "useWebRTC",
    ()=>useWebRTC
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/hooks/useSocket'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const WebRTCContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const useWebRTC = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRtcProvider');
    }
    return context;
};
_s(useWebRTC, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const WebRtcProvider = ({ children })=>{
    _s1();
    const { emit, isConnected, on, off } = useSocket();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerConnections, setPeerConnections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const peerConnectionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [connectedDevices, setConnectedDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [dataChannels, setDataChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const dataChannelsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const pushMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[pushMessage]": ({ message, messageType })=>{
            setMessage({
                "WebRtcProvider.useCallback[pushMessage]": (prev)=>[
                        ...prev,
                        {
                            message,
                            messageType
                        }
                    ]
            }["WebRtcProvider.useCallback[pushMessage]"]);
            if (messageType === 'success') {
                setTimeout({
                    "WebRtcProvider.useCallback[pushMessage]": ()=>{
                        removeMessage({
                            message,
                            messageType
                        });
                    }
                }["WebRtcProvider.useCallback[pushMessage]"], 5000);
            }
        }
    }["WebRtcProvider.useCallback[pushMessage]"], []);
    const removeMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[removeMessage]": ({ message, messageType })=>{
            setMessage({
                "WebRtcProvider.useCallback[removeMessage]": (prev)=>prev.filter({
                        "WebRtcProvider.useCallback[removeMessage]": (item)=>!(item.message === message && item.messageType === messageType)
                    }["WebRtcProvider.useCallback[removeMessage]"])
            }["WebRtcProvider.useCallback[removeMessage]"]);
        }
    }["WebRtcProvider.useCallback[removeMessage]"], []);
    const setupPeerConnectionListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (peerConnection, deviceIp)=>{
            // Connection state change listener
            peerConnection.addEventListener('connectionstatechange', {
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": ()=>{
                    console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
                    switch(peerConnection.connectionState){
                        case 'connected':
                            console.log('✅ WebRTC connection established with:', deviceIp);
                            emit('webrtc-connected', {
                                targetIp: deviceIp
                            });
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (prev)=>new Set(prev).add(deviceIp)
                            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
                            pushMessage({
                                message: `Connected to ${deviceIp}`,
                                messageType: 'success'
                            });
                            break;
                        case 'connecting':
                            console.log('🔄 Connecting to:', deviceIp);
                            break;
                        case 'disconnected':
                            console.log('⚠️ WebRTC connection disconnected:', deviceIp);
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (prev)=>{
                                    const newSet = new Set(prev);
                                    newSet.delete(deviceIp);
                                    return newSet;
                                }
                            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
                            break;
                        case 'failed':
                            console.log('❌ WebRTC connection failed:', deviceIp);
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (prev)=>{
                                    const newSet = new Set(prev);
                                    newSet.delete(deviceIp);
                                    return newSet;
                                }
                            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
                            emit('webrtc-disconnected', {
                                targetIp: deviceIp
                            });
                            pushMessage({
                                message: `Connection failed with ${deviceIp}`,
                                messageType: 'error'
                            });
                            break;
                        case 'closed':
                            console.log('🔒 WebRTC connection closed:', deviceIp);
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (prev)=>{
                                    const newSet = new Set(prev);
                                    newSet.delete(deviceIp);
                                    return newSet;
                                }
                            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
                            emit('webrtc-disconnected', {
                                targetIp: deviceIp
                            });
                            break;
                    }
                }
            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
            // ICE connection state change listener
            peerConnection.addEventListener('iceconnectionstatechange', {
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": ()=>{
                    console.log(`🧊 ICE connection state for ${deviceIp}: ${peerConnection.iceConnectionState}`);
                }
            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
            // ICE gathering state change listener
            peerConnection.addEventListener('icegatheringstatechange', {
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": ()=>{
                    console.log(`📡 ICE gathering state for ${deviceIp}: ${peerConnection.iceGatheringState}`);
                }
            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
            // Signaling state change listener
            peerConnection.addEventListener('signalingstatechange', {
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": ()=>{
                    console.log(`📶 Signaling state for ${deviceIp}: ${peerConnection.signalingState}`);
                }
            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
            // ICE candidate handler
            peerConnection.onicecandidate = ({
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (event)=>{
                    if (event.candidate) {
                        console.log('🧊 Sending ICE candidate to:', deviceIp, event.candidate.type);
                        emit('ice-candidate', {
                            targetIp: deviceIp,
                            candidate: event.candidate.toJSON()
                        });
                    } else {
                        console.log('✅ ICE gathering complete for:', deviceIp);
                    }
                }
            })["WebRtcProvider.useCallback[setupPeerConnectionListeners]"];
            // DataChannel listener (for receiving side)
            peerConnection.addEventListener('datachannel', {
                "WebRtcProvider.useCallback[setupPeerConnectionListeners]": (event)=>{
                    console.log('📨 DataChannel received from:', deviceIp);
                    const dataChannel = event.channel;
                    setupDataChannelListeners(dataChannel, deviceIp);
                    const newDataChannels = new Map(dataChannelsRef.current);
                    newDataChannels.set(deviceIp, dataChannel);
                    dataChannelsRef.current = newDataChannels;
                    setDataChannels(newDataChannels);
                }
            }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"]);
        }
    }["WebRtcProvider.useCallback[setupPeerConnectionListeners]"], [
        emit,
        pushMessage
    ]);
    const setupDataChannelListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[setupDataChannelListeners]": (dataChannel, deviceIp)=>{
            dataChannel.addEventListener('open', {
                "WebRtcProvider.useCallback[setupDataChannelListeners]": ()=>{
                    console.log('✅ DataChannel opened for:', deviceIp);
                    pushMessage({
                        message: `Chat ready with ${deviceIp}`,
                        messageType: 'success'
                    });
                }
            }["WebRtcProvider.useCallback[setupDataChannelListeners]"]);
            dataChannel.addEventListener('close', {
                "WebRtcProvider.useCallback[setupDataChannelListeners]": ()=>{
                    console.log('❌ DataChannel closed for:', deviceIp);
                    const newDataChannels = new Map(dataChannelsRef.current);
                    newDataChannels.delete(deviceIp);
                    dataChannelsRef.current = newDataChannels;
                    setDataChannels(newDataChannels);
                }
            }["WebRtcProvider.useCallback[setupDataChannelListeners]"]);
            dataChannel.addEventListener('error', {
                "WebRtcProvider.useCallback[setupDataChannelListeners]": (error)=>{
                    console.error('❌ DataChannel error:', error);
                }
            }["WebRtcProvider.useCallback[setupDataChannelListeners]"]);
        }
    }["WebRtcProvider.useCallback[setupDataChannelListeners]"], [
        pushMessage
    ]);
    const connectAndCreateOffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[connectAndCreateOffer]": async (deviceIp)=>{
            if (!isConnected) {
                pushMessage({
                    message: 'Socket is not connected',
                    messageType: 'error'
                });
                return;
            }
            if (!deviceIp) {
                pushMessage({
                    message: 'Invalid device IP',
                    messageType: 'error'
                });
                return;
            }
            let peerConnection = peerConnectionsRef.current.get(deviceIp);
            if (!peerConnection) {
                console.log('🔌 Creating peer connection for:', deviceIp);
                peerConnection = new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: 'stun:stun.l.google.com:19302'
                        },
                        {
                            urls: 'stun:stun1.l.google.com:19302'
                        },
                        {
                            urls: 'stun:stun2.l.google.com:19302'
                        }
                    ],
                    iceCandidatePoolSize: 10
                });
                setupPeerConnectionListeners(peerConnection, deviceIp);
                // Create DataChannel (for initiating side)
                console.log('📨 Creating DataChannel for:', deviceIp);
                const dataChannel = peerConnection.createDataChannel('chat', {
                    ordered: true
                });
                setupDataChannelListeners(dataChannel, deviceIp);
                const newDataChannels = new Map(dataChannelsRef.current);
                newDataChannels.set(deviceIp, dataChannel);
                dataChannelsRef.current = newDataChannels;
                setDataChannels(newDataChannels);
                // Update both ref and state
                const newPeerConnections = new Map(peerConnectionsRef.current);
                newPeerConnections.set(deviceIp, peerConnection);
                peerConnectionsRef.current = newPeerConnections;
                setPeerConnections(newPeerConnections);
            }
            try {
                console.log('📤 Creating offer for:', deviceIp);
                const offer = await peerConnection.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                });
                console.log('📝 Setting local description (offer)');
                await peerConnection.setLocalDescription(offer);
                console.log('📤 Sending offer via socket');
                emit('offer', {
                    targetIp: deviceIp,
                    sdp: peerConnection.localDescription
                });
            } catch (error) {
                console.error('❌ Error creating offer:', error);
                pushMessage({
                    message: 'Failed to create offer',
                    messageType: 'error'
                });
            }
        }
    }["WebRtcProvider.useCallback[connectAndCreateOffer]"], [
        isConnected,
        emit,
        pushMessage,
        setupPeerConnectionListeners,
        setupDataChannelListeners
    ]);
    const createAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[createAnswer]": async (deviceIp)=>{
            if (!isConnected) {
                pushMessage({
                    message: 'Socket is not connected',
                    messageType: 'error'
                });
                return;
            }
            if (!deviceIp) {
                pushMessage({
                    message: 'Invalid device IP',
                    messageType: 'error'
                });
                return;
            }
            const peerConnection = peerConnectionsRef.current.get(deviceIp);
            if (!peerConnection) {
                pushMessage({
                    message: 'Peer connection not found',
                    messageType: 'error'
                });
                return;
            }
            try {
                console.log('📥 Creating answer for:', deviceIp);
                const answer = await peerConnection.createAnswer();
                console.log('📝 Setting local description (answer)');
                await peerConnection.setLocalDescription(answer);
                console.log('📤 Sending answer via socket');
                emit('answer', {
                    targetIp: deviceIp,
                    sdp: peerConnection.localDescription
                });
                return answer;
            } catch (error) {
                console.error('❌ Error creating answer:', error);
                pushMessage({
                    message: 'Failed to create answer',
                    messageType: 'error'
                });
            }
        }
    }["WebRtcProvider.useCallback[createAnswer]"], [
        isConnected,
        emit,
        pushMessage
    ]);
    const disconnectDevice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[disconnectDevice]": (deviceIp)=>{
            const peerConnection = peerConnectionsRef.current.get(deviceIp);
            const dataChannel = dataChannelsRef.current.get(deviceIp);
            if (dataChannel) {
                console.log('📨 Closing DataChannel for:', deviceIp);
                dataChannel.close();
                const newDataChannels = new Map(dataChannelsRef.current);
                newDataChannels.delete(deviceIp);
                dataChannelsRef.current = newDataChannels;
                setDataChannels(newDataChannels);
            }
            if (peerConnection) {
                console.log('🔌 Closing peer connection for:', deviceIp);
                peerConnection.close();
                const newPeerConnections = new Map(peerConnectionsRef.current);
                newPeerConnections.delete(deviceIp);
                peerConnectionsRef.current = newPeerConnections;
                setPeerConnections(newPeerConnections);
                setConnectedDevices({
                    "WebRtcProvider.useCallback[disconnectDevice]": (prev)=>{
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    }
                }["WebRtcProvider.useCallback[disconnectDevice]"]);
                emit('webrtc-disconnected', {
                    targetIp: deviceIp
                });
            }
        }
    }["WebRtcProvider.useCallback[disconnectDevice]"], [
        emit
    ]);
    const createPeerConnectionIfNotExists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WebRtcProvider.useCallback[createPeerConnectionIfNotExists]": async (deviceIp)=>{
            if (peerConnectionsRef.current.has(deviceIp)) {
                return peerConnectionsRef.current.get(deviceIp);
            }
            console.log('🔌 Creating peer connection for incoming connection:', deviceIp);
            const peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    },
                    {
                        urls: 'stun:stun1.l.google.com:19302'
                    },
                    {
                        urls: 'stun:stun2.l.google.com:19302'
                    }
                ],
                iceCandidatePoolSize: 10
            });
            setupPeerConnectionListeners(peerConnection, deviceIp);
            // Update both ref and state
            const newPeerConnections = new Map(peerConnectionsRef.current);
            newPeerConnections.set(deviceIp, peerConnection);
            peerConnectionsRef.current = newPeerConnections;
            setPeerConnections(newPeerConnections);
            return peerConnection;
        }
    }["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"], [
        setupPeerConnectionListeners
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WebRtcProvider.useEffect": ()=>{
            if (!isConnected) {
                return;
            }
            // Handle incoming offer
            const handleOffer = {
                "WebRtcProvider.useEffect.handleOffer": async (data)=>{
                    const fromDeviceIp = data.from;
                    console.log('📥 Received offer from:', fromDeviceIp);
                    const peerConnection = await createPeerConnectionIfNotExists(fromDeviceIp);
                    if (!peerConnection) {
                        pushMessage({
                            message: 'Failed to create peer connection',
                            messageType: 'error'
                        });
                        return;
                    }
                    try {
                        console.log('📝 Setting remote description (offer)');
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                        console.log('✅ Remote description set successfully');
                        await createAnswer(fromDeviceIp);
                    } catch (error) {
                        console.error('❌ Error handling offer:', error);
                        pushMessage({
                            message: 'Failed to handle offer',
                            messageType: 'error'
                        });
                    }
                }
            }["WebRtcProvider.useEffect.handleOffer"];
            // Handle incoming answer
            const handleAnswer = {
                "WebRtcProvider.useEffect.handleAnswer": async (data)=>{
                    const fromDeviceIp = data.from;
                    console.log('📥 Received answer from:', fromDeviceIp);
                    const peerConnection = peerConnectionsRef.current.get(fromDeviceIp);
                    if (!peerConnection) {
                        console.error('❌ Peer connection not found for answer');
                        pushMessage({
                            message: 'Peer connection not found',
                            messageType: 'error'
                        });
                        return;
                    }
                    try {
                        console.log('📝 Setting remote description (answer)');
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                        console.log('✅ Remote description (answer) set successfully');
                    } catch (error) {
                        console.error('❌ Error handling answer:', error);
                        pushMessage({
                            message: 'Failed to handle answer',
                            messageType: 'error'
                        });
                    }
                }
            }["WebRtcProvider.useEffect.handleAnswer"];
            // Handle incoming ICE candidate
            const handleIceCandidate = {
                "WebRtcProvider.useEffect.handleIceCandidate": async (data)=>{
                    const fromDeviceIp = data.from;
                    console.log('🧊 Received ICE candidate from:', fromDeviceIp, data.candidate);
                    const peerConnection = peerConnectionsRef.current.get(fromDeviceIp);
                    if (!peerConnection) {
                        console.error('❌ Peer connection not found for ICE candidate');
                        return;
                    }
                    try {
                        if (peerConnection.remoteDescription) {
                            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                            console.log('✅ ICE candidate added successfully');
                        } else {
                            console.warn('⚠️ Remote description not set yet, queuing ICE candidate');
                            // Queue the candidate for later
                            setTimeout({
                                "WebRtcProvider.useEffect.handleIceCandidate": async ()=>{
                                    if (peerConnection.remoteDescription) {
                                        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                                        console.log('✅ Queued ICE candidate added successfully');
                                    }
                                }
                            }["WebRtcProvider.useEffect.handleIceCandidate"], 100);
                        }
                    } catch (err) {
                        console.error("❌ Error adding ICE candidate:", err);
                    }
                }
            }["WebRtcProvider.useEffect.handleIceCandidate"];
            // Handle connection notification from other device
            const handleWebRTCConnected = {
                "WebRtcProvider.useEffect.handleWebRTCConnected": (data)=>{
                    console.log('✅ Received connection notification from:', data.fromIp);
                    setConnectedDevices({
                        "WebRtcProvider.useEffect.handleWebRTCConnected": (prev)=>new Set(prev).add(data.fromIp)
                    }["WebRtcProvider.useEffect.handleWebRTCConnected"]);
                }
            }["WebRtcProvider.useEffect.handleWebRTCConnected"];
            // Handle disconnection notification
            const handleWebRTCDisconnected = {
                "WebRtcProvider.useEffect.handleWebRTCDisconnected": (data)=>{
                    console.log('❌ Received disconnection notification from:', data.fromIp);
                    setConnectedDevices({
                        "WebRtcProvider.useEffect.handleWebRTCDisconnected": (prev)=>{
                            const newSet = new Set(prev);
                            newSet.delete(data.fromIp);
                            return newSet;
                        }
                    }["WebRtcProvider.useEffect.handleWebRTCDisconnected"]);
                }
            }["WebRtcProvider.useEffect.handleWebRTCDisconnected"];
            on('offer', handleOffer);
            on('answer', handleAnswer);
            on('ice-candidate', handleIceCandidate);
            on('webrtc-connection-notify', handleWebRTCConnected);
            on('webrtc-disconnection-notify', handleWebRTCDisconnected);
            return ({
                "WebRtcProvider.useEffect": ()=>{
                    off('offer', handleOffer);
                    off('answer', handleAnswer);
                    off('ice-candidate', handleIceCandidate);
                    off('webrtc-connection-notify', handleWebRTCConnected);
                    off('webrtc-disconnection-notify', handleWebRTCDisconnected);
                }
            })["WebRtcProvider.useEffect"];
        }
    }["WebRtcProvider.useEffect"], [
        isConnected,
        on,
        off,
        createAnswer,
        createPeerConnectionIfNotExists,
        pushMessage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WebRTCContext.Provider, {
        value: {
            peerConnections,
            connectAndCreateOffer,
            createAnswer,
            removeMessage,
            pushMessage,
            message,
            connectedDevices,
            disconnectDevice,
            dataChannels
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/provider/useWebRTC.tsx",
        lineNumber: 450,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(WebRtcProvider, "DwqrFiD9tdeRSZRjMUIGoqkTcaY=", false, function() {
    return [
        useSocket
    ];
});
_c = WebRtcProvider;
var _c;
__turbopack_context__.k.register(_c, "WebRtcProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/slices/state.slice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addIncomingConnection",
    ()=>addIncomingConnection,
    "clearDeviceState",
    ()=>clearDeviceState,
    "clearIncomingConnections",
    ()=>clearIncomingConnections,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deviceSlice",
    ()=>deviceSlice,
    "removeIncomingConnection",
    ()=>removeIncomingConnection,
    "setDeviceConnected",
    ()=>setDeviceConnected,
    "setDevices",
    ()=>setDevices,
    "setIsConnected",
    ()=>setIsConnected,
    "setIsRegistering",
    ()=>setIsRegistering,
    "setSelectedDevice",
    ()=>setSelectedDevice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    isConnected: false,
    devices: [],
    selectedDevice: null,
    deviceConnected: null,
    isRegistering: false,
    incomingConnections: {}
};
const deviceSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'device',
    initialState,
    reducers: {
        setDevices: (state, action)=>{
            state.devices = action.payload;
        },
        setSelectedDevice: (state, action)=>{
            state.selectedDevice = action.payload;
        },
        setDeviceConnected: (state, action)=>{
            state.deviceConnected = action.payload;
        },
        setIsRegistering: (state, action)=>{
            state.isRegistering = action.payload;
        },
        addIncomingConnection: (state, action)=>{
            state.incomingConnections[action.payload.ip] = {
                name: action.payload.name,
                ip: action.payload.ip
            };
        },
        removeIncomingConnection: (state, action)=>{
            delete state.incomingConnections[action.payload];
        },
        clearIncomingConnections: (state)=>{
            state.incomingConnections = {};
        },
        clearDeviceState: (state)=>{
            state.devices = [];
            state.selectedDevice = null;
            state.deviceConnected = null;
            state.incomingConnections = {};
        },
        setIsConnected: (state, action)=>{
            state.isConnected = action.payload;
        }
    }
});
const { setDevices, setSelectedDevice, setDeviceConnected, setIsRegistering, addIncomingConnection, removeIncomingConnection, clearIncomingConnections, clearDeviceState, setIsConnected } = deviceSlice.actions;
const __TURBOPACK__default__export__ = deviceSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$state$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/state.slice.ts [app-client] (ecmascript)");
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        device: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$state$2e$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        })
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/StoreProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoreProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/store.ts [app-client] (ecmascript)");
'use client';
;
;
;
function StoreProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/store/StoreProvider.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
_c = StoreProvider;
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/provider/useSocket.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocketProvider",
    ()=>SocketProvider,
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const SOCKET_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL || 'https://werbrtc-server.onrender.com';
const SocketContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
let socketInstance = null;
function SocketProvider({ children }) {
    _s();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[getSocket]": ()=>{
            if (!socketInstance) {
                socketInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(SOCKET_URL, {
                    transports: [
                        'websocket'
                    ],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000,
                    autoConnect: false
                });
            }
            return socketInstance;
        }
    }["SocketProvider.useCallback[getSocket]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketProvider.useEffect": ()=>{
            const socket = getSocket();
            socketRef.current = socket;
            const handleConnect = {
                "SocketProvider.useEffect.handleConnect": ()=>setIsConnected(true)
            }["SocketProvider.useEffect.handleConnect"];
            const handleDisconnect = {
                "SocketProvider.useEffect.handleDisconnect": ()=>setIsConnected(false)
            }["SocketProvider.useEffect.handleDisconnect"];
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
            return ({
                "SocketProvider.useEffect": ()=>{
                    socket.off('connect', handleConnect);
                    socket.off('disconnect', handleDisconnect);
                }
            })["SocketProvider.useEffect"];
        }
    }["SocketProvider.useEffect"], [
        getSocket
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[connect]": ()=>{
            socketRef.current?.connect();
        }
    }["SocketProvider.useCallback[connect]"], []);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[disconnect]": ()=>{
            socketRef.current?.disconnect();
        }
    }["SocketProvider.useCallback[disconnect]"], []);
    const emit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[emit]": (event, data)=>{
            socketRef.current?.emit(event, data);
        }
    }["SocketProvider.useCallback[emit]"], []);
    const on = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[on]": (event, callback)=>{
            socketRef.current?.on(event, callback);
            return ({
                "SocketProvider.useCallback[on]": ()=>socketRef.current?.off(event, callback)
            })["SocketProvider.useCallback[on]"];
        }
    }["SocketProvider.useCallback[on]"], []);
    const off = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketProvider.useCallback[off]": (event, callback)=>{
            socketRef.current?.off(event, callback);
            return ({
                "SocketProvider.useCallback[off]": ()=>socketRef.current?.off(event, callback)
            })["SocketProvider.useCallback[off]"];
        }
    }["SocketProvider.useCallback[off]"], []);
    const value = {
        socket: socketRef.current,
        isConnected,
        connect,
        disconnect,
        emit,
        on,
        off
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocketContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/provider/useSocket.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(SocketProvider, "ltAmZ71t1iIrxLxm88CCM8VNbCE=");
_c = SocketProvider;
function useSocket() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
_s1(useSocket, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SocketProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_676351c6._.js.map