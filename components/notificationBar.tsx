'use client'

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

interface Message {
  message: string
  messageType: 'success' | 'error'
}

interface NotificationBarProps {
  messages: Message[]
  onRemoveMessage: (msg: Message) => void
}

export default function NotificationBar({ messages, onRemoveMessage }: NotificationBarProps) {
  if (messages.length === 0) return null

  return (
    <div className="px-3 sm:px-4 md:px-6 py-2 space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-3 flex items-center justify-between shadow-sm ${
            msg.messageType === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {msg.messageType === 'success' ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            )}
            <span
              className={`text-xs sm:text-sm font-medium truncate ${
                msg.messageType === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {msg.message}
            </span>
          </div>
          <button
            onClick={() => onRemoveMessage(msg)}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
          >
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      ))}
    </div>
  )
}
