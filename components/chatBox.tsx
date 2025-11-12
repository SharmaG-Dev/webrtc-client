'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, X, MessageSquare, Minimize2, Maximize2 } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  timestamp: Date
}

interface ChatBoxProps {
  deviceName: string
  deviceIp: string
  dataChannel: RTCDataChannel | null
  onClose: () => void
}

export default function ChatBox({ deviceName, deviceIp, dataChannel, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Setup DataChannel listeners
  useEffect(() => {
    if (!dataChannel) return

    const handleMessage = (event: MessageEvent) => {
      console.log('📨 Received message:', event.data)
      
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        text: event.data,
        sender: 'them',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
    }

    const handleOpen = () => {
      console.log('✅ DataChannel opened')
    }

    const handleClose = () => {
      console.log('❌ DataChannel closed')
    }

    const handleError = (error: Event) => {
      console.error('❌ DataChannel error:', error)
    }

    dataChannel.addEventListener('message', handleMessage)
    dataChannel.addEventListener('open', handleOpen)
    dataChannel.addEventListener('close', handleClose)
    dataChannel.addEventListener('error', handleError)

    return () => {
      dataChannel.removeEventListener('message', handleMessage)
      dataChannel.removeEventListener('open', handleOpen)
      dataChannel.removeEventListener('close', handleClose)
      dataChannel.removeEventListener('error', handleError)
    }
  }, [dataChannel])

  const sendMessage = () => {
    if (!inputMessage.trim() || !dataChannel) return

    if (dataChannel.readyState !== 'open') {
      console.error('DataChannel is not open')
      return
    }

    try {
      dataChannel.send(inputMessage)
      
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        text: inputMessage,
        sender: 'me',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')
      inputRef.current?.focus()
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-sm text-gray-800">{deviceName}</p>
            <p className="text-xs text-gray-500">{messages.length} messages</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-white" />
          <div>
            <h3 className="text-white font-semibold">{deviceName}</h3>
            <p className="text-white/80 text-xs font-mono">{deviceIp}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No messages yet</p>
              <p className="text-gray-400 text-xs">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!dataChannel || dataChannel.readyState !== 'open'}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !dataChannel || dataChannel.readyState !== 'open'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {(!dataChannel || dataChannel.readyState !== 'open') && (
          <p className="text-xs text-red-500 mt-2">Connection not ready for messaging</p>
        )}
      </div>
    </div>
  )
}
