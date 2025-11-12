module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/hooks/useSocket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://werbrtc-server.onrender.com';
let socketInstance = null;
function useSocket() {
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socketInstance) {
            socketInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(SOCKET_URL, {
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
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const socket = getSocket();
        socketRef.current = socket;
        const handleConnect = ()=>setIsConnected(true);
        const handleDisconnect = ()=>setIsConnected(false);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        return ()=>{
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [
        getSocket
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        socketRef.current?.connect();
    }, []);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        socketRef.current?.disconnect();
    }, []);
    const emit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event, data)=>{
        socketRef.current?.emit(event, data);
    }, []);
    const on = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event, callback)=>{
        socketRef.current?.on(event, callback);
        return ()=>socketRef.current?.off(event, callback);
    }, []);
    const off = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event, callback)=>{
        socketRef.current?.off(event, callback);
        return ()=>socketRef.current?.off(event, callback);
    }, []);
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
}),
"[project]/provider/useWebRTC.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebRTCContext",
    ()=>WebRTCContext,
    "WebRtcProvider",
    ()=>WebRtcProvider,
    "useWebRTC",
    ()=>useWebRTC
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSocket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const WebRTCContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const useWebRTC = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRtcProvider');
    }
    return context;
};
const WebRtcProvider = ({ children })=>{
    const { emit, isConnected, on, off } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSocket"])();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerConnections, setPeerConnections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const peerConnectionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [connectedDevices, setConnectedDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const pushMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ message, messageType })=>{
        setMessage((prev)=>[
                ...prev,
                {
                    message,
                    messageType
                }
            ]);
        // Auto-remove success messages after 5 seconds
        if (messageType === 'success') {
            setTimeout(()=>{
                removeMessage({
                    message,
                    messageType
                });
            }, 5000);
        }
    }, []);
    const removeMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ message, messageType })=>{
        setMessage((prev)=>prev.filter((item)=>!(item.message === message && item.messageType === messageType)));
    }, []);
    const connectAndCreateOffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (deviceIp)=>{
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
            peerConnection.addEventListener('connectionstatechange', ()=>{
                console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
                switch(peerConnection.connectionState){
                    case 'connected':
                        console.log('✅ WebRTC connection established with:', deviceIp);
                        emit('webrtc-connected', {
                            targetIp: deviceIp
                        });
                        setConnectedDevices((prev)=>new Set(prev).add(deviceIp));
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
                        setConnectedDevices((prev)=>{
                            const newSet = new Set(prev);
                            newSet.delete(deviceIp);
                            return newSet;
                        });
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
                        setConnectedDevices((prev)=>{
                            const newSet = new Set(prev);
                            newSet.delete(deviceIp);
                            return newSet;
                        });
                        emit('webrtc-disconnected', {
                            targetIp: deviceIp
                        });
                        break;
                }
            });
            // ICE connection state change listener
            peerConnection.addEventListener('iceconnectionstatechange', ()=>{
                console.log(`🧊 ICE connection state for ${deviceIp}: ${peerConnection.iceConnectionState}`);
            });
            // ICE candidate handler
            peerConnection.onicecandidate = (event)=>{
                if (event.candidate) {
                    console.log('🧊 Sending ICE candidate to:', deviceIp);
                    emit('ice-candidate', {
                        targetIp: deviceIp,
                        candidate: event.candidate
                    });
                }
            };
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
    }, [
        isConnected,
        emit,
        pushMessage
    ]);
    const createAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (deviceIp)=>{
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
    }, [
        isConnected,
        emit,
        pushMessage
    ]);
    const disconnectDevice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((deviceIp)=>{
        const peerConnection = peerConnectionsRef.current.get(deviceIp);
        if (peerConnection) {
            console.log('🔌 Closing peer connection for:', deviceIp);
            peerConnection.close();
            const newPeerConnections = new Map(peerConnectionsRef.current);
            newPeerConnections.delete(deviceIp);
            peerConnectionsRef.current = newPeerConnections;
            setPeerConnections(newPeerConnections);
            setConnectedDevices((prev)=>{
                const newSet = new Set(prev);
                newSet.delete(deviceIp);
                return newSet;
            });
            emit('webrtc-disconnected', {
                targetIp: deviceIp
            });
        }
    }, [
        emit
    ]);
    const createPeerConnectionIfNotExists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (deviceIp)=>{
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
        peerConnection.addEventListener('connectionstatechange', ()=>{
            console.log(`📡 Connection state for ${deviceIp}: ${peerConnection.connectionState}`);
            switch(peerConnection.connectionState){
                case 'connected':
                    console.log('✅ WebRTC connection established with:', deviceIp);
                    emit('webrtc-connected', {
                        targetIp: deviceIp
                    });
                    setConnectedDevices((prev)=>new Set(prev).add(deviceIp));
                    pushMessage({
                        message: `Connected to ${deviceIp}`,
                        messageType: 'success'
                    });
                    break;
                case 'disconnected':
                case 'failed':
                case 'closed':
                    setConnectedDevices((prev)=>{
                        const newSet = new Set(prev);
                        newSet.delete(deviceIp);
                        return newSet;
                    });
                    break;
            }
        });
        // ICE candidate handler
        peerConnection.onicecandidate = (event)=>{
            if (event.candidate) {
                console.log('🧊 Sending ICE candidate to:', deviceIp);
                emit('ice-candidate', {
                    targetIp: deviceIp,
                    candidate: event.candidate
                });
            }
        };
        // Update both ref and state
        const newPeerConnections = new Map(peerConnectionsRef.current);
        newPeerConnections.set(deviceIp, peerConnection);
        peerConnectionsRef.current = newPeerConnections;
        setPeerConnections(newPeerConnections);
        return peerConnection;
    }, [
        emit,
        pushMessage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isConnected) {
            return;
        }
        // Handle incoming offer
        const handleOffer = async (data)=>{
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
        };
        // Handle incoming answer
        const handleAnswer = async (data)=>{
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
        };
        // Handle incoming ICE candidate
        const handleIceCandidate = async (data)=>{
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
        };
        // Handle connection notification from other device
        const handleWebRTCConnected = (data)=>{
            console.log('✅ Received connection notification from:', data.fromIp);
            setConnectedDevices((prev)=>new Set(prev).add(data.fromIp));
        };
        // Handle disconnection notification
        const handleWebRTCDisconnected = (data)=>{
            console.log(' Received disconnection notification from:', data.fromIp);
            setConnectedDevices((prev)=>{
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
        return ()=>{
            off('offer', handleOffer);
            off('answer', handleAnswer);
            off('ice-candidate', handleIceCandidate);
            off('webrtc-connection-notify', handleWebRTCConnected);
            off('webrtc-disconnection-notify', handleWebRTCDisconnected);
        };
    }, [
        isConnected,
        on,
        off,
        createAnswer,
        createPeerConnectionIfNotExists,
        pushMessage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WebRTCContext.Provider, {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5bef41c9._.js.map