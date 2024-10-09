import React, { useState, useRef, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

interface MessageInputProps {
  sendMessage: (message: string) => void
  isWaitingForResponse: boolean
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage, isWaitingForResponse }) => {
  const [message, setMessage] = useState('')
  const divRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isWaitingForResponse) {
      sendMessage(message)
      setMessage('')
      if (divRef.current) {
        divRef.current.innerHTML = ''
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = () => {
    if (divRef.current) {
      setMessage(divRef.current.innerText)
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus()
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="mt-auto w-full bg-neutral-900 px-4 pb-2">
      <div className="relative bg-neutral-800 p-2 rounded-2xl w-full max-w-3xl mx-auto shadow-lg">
        <div className="pr-12"> {/* Added padding-right to make space for the button */}
          <div
            ref={divRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="text-white px-4 py-3 rounded-xl focus:outline-none w-full resize-none max-h-[200px] overflow-y-auto break-all whitespace-pre-wrap empty:before:content-[attr(data-placeholder)] empty:before:text-[#5e5f61] empty:before:pointer-events-none empty:before:absolute empty:before:whitespace-nowrap empty:before:overflow-hidden empty:before:text-ellipsis empty:before:max-w-full"
            data-placeholder="Ask about my projects..."
          />
        </div>
        <div className="absolute right-4 bottom-4">
          <button
            type="submit"
            disabled={isWaitingForResponse}
            className={`rounded-xl w-8 h-8 flex items-center justify-center transition duration-300 ${
              isWaitingForResponse ? 'bg-red-600 hover:bg-red-700' : 'bg-neutral-500 hover:bg-neutral-600'
            }`}
          >
            {isWaitingForResponse ? (
              'Stop'
            ) : (
              <ArrowUp className="w-6 h-6 text-background" />
            )}
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-neutral-500 pt-2">Responses are generated and may be incorrect!</p>
    </form>
  );
}

export default MessageInput