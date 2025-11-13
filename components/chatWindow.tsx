'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Smartphone, Monitor, Globe2, MoreVertical, X, ArrowLeft } from 'lucide-react'
import MessageBubble from './messageBubble'


interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  timestamp: Date
}

interface ChatWindowProps {
  deviceName: string
  deviceIp: string
  deviceType: string
  dataChannel: RTCDataChannel | null
  onDisconnect: () => void
  onBack?: () => void
}

export default function ChatWindow({
  deviceName,
  deviceIp,
  deviceType,
  dataChannel,
  onDisconnect,
  onBack
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!dataChannel) return

    const handleMessage = (event: MessageEvent) => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        text: event.data,
        sender: 'them',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMessage])
    }

    dataChannel.addEventListener('message', handleMessage)
    return () => dataChannel.removeEventListener('message', handleMessage)
  }, [dataChannel])

  const sendMessage = () => {
    if (!inputMessage.trim() || !dataChannel || dataChannel.readyState !== 'open') return

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

  const getDeviceIcon = () => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5"
    switch (deviceType) {
      case 'Mobile':
        return <Smartphone className={iconClass} />
      case 'PC':
        return <Monitor className={iconClass} />
      case 'Web':
        return <Globe2 className={iconClass} />
      default:
        return <Smartphone className={iconClass} />
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat Header - Responsive */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Back Button - Only visible on mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          )}
          
          <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg text-white flex-shrink-0">
            {getDeviceIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-semibold text-sm sm:text-base md:text-lg truncate">
              {deviceName}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-mono truncate">
              {deviceIp}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="relative flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                <button
                  onClick={() => {
                    onDisconnect()
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Messages Area - Scrollable with responsive padding */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                {getDeviceIcon()}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Start Chatting</h3>
              <p className="text-gray-500 text-xs sm:text-sm">Send a message to begin the conversation</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Responsive padding */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!dataChannel || dataChannel.readyState !== 'open'}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !dataChannel || dataChannel.readyState !== 'open'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed shadow-lg flex-shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        {(!dataChannel || dataChannel.readyState !== 'open') && (
          <p className="text-xs text-red-500 mt-2">Connection not ready for messaging</p>
        )}
      </div>
    </div>
  )
}
