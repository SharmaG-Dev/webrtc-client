(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useSocket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const SOCKET_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL || 'https://werbrtc-server.onrender.com';
let socketInstance = null;
function useSocket() {
    _s();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[getSocket]": ()=>{
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
    }["useSocket.useCallback[getSocket]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSocket.useEffect": ()=>{
            const socket = getSocket();
            socketRef.current = socket;
            const handleConnect = {
                "useSocket.useEffect.handleConnect": ()=>setIsConnected(true)
            }["useSocket.useEffect.handleConnect"];
            const handleDisconnect = {
                "useSocket.useEffect.handleDisconnect": ()=>setIsConnected(false)
            }["useSocket.useEffect.handleDisconnect"];
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
            return ({
                "useSocket.useEffect": ()=>{
                    socket.off('connect', handleConnect);
                    socket.off('disconnect', handleDisconnect);
                }
            })["useSocket.useEffect"];
        }
    }["useSocket.useEffect"], [
        getSocket
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[connect]": ()=>{
            socketRef.current?.connect();
        }
    }["useSocket.useCallback[connect]"], []);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[disconnect]": ()=>{
            socketRef.current?.disconnect();
        }
    }["useSocket.useCallback[disconnect]"], []);
    const emit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[emit]": (event, data)=>{
            socketRef.current?.emit(event, data);
        }
    }["useSocket.useCallback[emit]"], []);
    const on = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[on]": (event, callback)=>{
            socketRef.current?.on(event, callback);
            return ({
                "useSocket.useCallback[on]": ()=>socketRef.current?.off(event, callback)
            })["useSocket.useCallback[on]"];
        }
    }["useSocket.useCallback[on]"], []);
    const off = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[off]": (event, callback)=>{
            socketRef.current?.off(event, callback);
            return ({
                "useSocket.useCallback[off]": ()=>socketRef.current?.off(event, callback)
            })["useSocket.useCallback[off]"];
        }
    }["useSocket.useCallback[off]"], []);
    return {
        socket: socketRef.current,
        isConnected,
        connect,
        disconnect,
        emit,
        on,
        off
    };
}
_s(useSocket, "ltAmZ71t1iIrxLxm88CCM8VNbCE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSocket.ts [app-client] (ecmascript)");
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
    const { emit, isConnected, on, off } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerConnections, setPeerConnections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const peerConnectionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [connectedDevices, setConnectedDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
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
            // Auto-remove success messages after 5 seconds
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
                        }
                    ],
                    iceCandidatePoolSize: 10
                });
                // Connection state change listener
                peerConnection.addEventListener('connectionstatechange', {
                    "WebRtcProvider.useCallback[connectAndCreateOffer]": ()=>{
                        console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
                        switch(peerConnection.connectionState){
                            case 'connected':
                                console.log('✅ WebRTC connection established with:', deviceIp);
                                emit('webrtc-connected', {
                                    targetIp: deviceIp
                                });
                                setConnectedDevices({
                                    "WebRtcProvider.useCallback[connectAndCreateOffer]": (prev)=>new Set(prev).add(deviceIp)
                                }["WebRtcProvider.useCallback[connectAndCreateOffer]"]);
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
                                setConnectedDevices({
                                    "WebRtcProvider.useCallback[connectAndCreateOffer]": (prev)=>{
                                        const newSet = new Set(prev);
                                        newSet.delete(deviceIp);
                                        return newSet;
                                    }
                                }["WebRtcProvider.useCallback[connectAndCreateOffer]"]);
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
                                    "WebRtcProvider.useCallback[connectAndCreateOffer]": (prev)=>{
                                        const newSet = new Set(prev);
                                        newSet.delete(deviceIp);
                                        return newSet;
                                    }
                                }["WebRtcProvider.useCallback[connectAndCreateOffer]"]);
                                emit('webrtc-disconnected', {
                                    targetIp: deviceIp
                                });
                                break;
                        }
                    }
                }["WebRtcProvider.useCallback[connectAndCreateOffer]"]);
                // ICE connection state change listener
                peerConnection.addEventListener('iceconnectionstatechange', {
                    "WebRtcProvider.useCallback[connectAndCreateOffer]": ()=>{
                        console.log(`🧊 ICE connection state for ${deviceIp}: ${peerConnection.iceConnectionState}`);
                    }
                }["WebRtcProvider.useCallback[connectAndCreateOffer]"]);
                // ICE candidate handler
                peerConnection.onicecandidate = ({
                    "WebRtcProvider.useCallback[connectAndCreateOffer]": (event)=>{
                        if (event.candidate) {
                            console.log('🧊 Sending ICE candidate to:', deviceIp);
                            emit('ice-candidate', {
                                targetIp: deviceIp,
                                candidate: event.candidate
                            });
                        }
                    }
                })["WebRtcProvider.useCallback[connectAndCreateOffer]"];
                // Update both ref and state
                const newPeerConnections = new Map(peerConnectionsRef.current);
                newPeerConnections.set(deviceIp, peerConnection);
                peerConnectionsRef.current = newPeerConnections;
                setPeerConnections(newPeerConnections);
            }
            // Create offer immediately with the same peer connection instance
            try {
                console.log('📤 Creating offer for:', deviceIp);
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                emit('offer', {
                    targetIp: deviceIp,
                    sdp: offer
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
        pushMessage
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
                await peerConnection.setLocalDescription(answer);
                emit('answer', {
                    targetIp: deviceIp,
                    sdp: answer
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
            console.log('🔌 Creating peer connection for incoming offer:', deviceIp);
            const peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    },
                    {
                        urls: 'stun:stun1.l.google.com:19302'
                    }
                ],
                iceCandidatePoolSize: 10
            });
            // Connection state change listener
            peerConnection.addEventListener('connectionstatechange', {
                "WebRtcProvider.useCallback[createPeerConnectionIfNotExists]": ()=>{
                    console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
                    switch(peerConnection.connectionState){
                        case 'connected':
                            console.log('✅ WebRTC connection established with:', deviceIp);
                            emit('webrtc-connected', {
                                targetIp: deviceIp
                            });
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[createPeerConnectionIfNotExists]": (prev)=>new Set(prev).add(deviceIp)
                            }["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"]);
                            pushMessage({
                                message: `Connected to ${deviceIp}`,
                                messageType: 'success'
                            });
                            break;
                        case 'disconnected':
                        case 'failed':
                        case 'closed':
                            setConnectedDevices({
                                "WebRtcProvider.useCallback[createPeerConnectionIfNotExists]": (prev)=>{
                                    const newSet = new Set(prev);
                                    newSet.delete(deviceIp);
                                    return newSet;
                                }
                            }["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"]);
                            break;
                    }
                }
            }["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"]);
            // ICE candidate handler
            peerConnection.onicecandidate = ({
                "WebRtcProvider.useCallback[createPeerConnectionIfNotExists]": (event)=>{
                    if (event.candidate) {
                        console.log('🧊 Sending ICE candidate to:', deviceIp);
                        emit('ice-candidate', {
                            targetIp: deviceIp,
                            candidate: event.candidate
                        });
                    }
                }
            })["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"];
            // Update both ref and state
            const newPeerConnections = new Map(peerConnectionsRef.current);
            newPeerConnections.set(deviceIp, peerConnection);
            peerConnectionsRef.current = newPeerConnections;
            setPeerConnections(newPeerConnections);
            return peerConnection;
        }
    }["WebRtcProvider.useCallback[createPeerConnectionIfNotExists]"], [
        emit,
        pushMessage
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
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
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
                        pushMessage({
                            message: 'Peer connection not found',
                            messageType: 'error'
                        });
                        return;
                    }
                    try {
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
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
                    console.log('🧊 Received ICE candidate from:', fromDeviceIp);
                    const peerConnection = peerConnectionsRef.current.get(fromDeviceIp);
                    if (!peerConnection) {
                        pushMessage({
                            message: 'Peer connection not found for ICE candidate',
                            messageType: 'error'
                        });
                        return;
                    }
                    try {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
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
                    console.log(' Received disconnection notification from:', data.fromIp);
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
            disconnectDevice
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/provider/useWebRTC.tsx",
        lineNumber: 375,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(WebRtcProvider, "q/Gz4pK3LZ4DMUWlKoDWuqOiYeY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = WebRtcProvider;
var _c;
__turbopack_context__.k.register(_c, "WebRtcProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f487d906._.js.map