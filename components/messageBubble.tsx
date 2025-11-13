'use client'

interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
          message.sender === 'me'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
        }`}
      >
        <p className="text-xs sm:text-sm break-words leading-relaxed">{message.text}</p>
        <p
          className={`text-xs mt-1 sm:mt-1.5 ${
            message.sender === 'me' ? 'text-white/70 text-right' : 'text-gray-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  )
}
