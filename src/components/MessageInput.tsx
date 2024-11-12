import React, { useState, useRef, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

interface MessageInputProps {
  sendMessage: (message: string) => void
  isWaitingForResponse: boolean
  onStop?: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage, isWaitingForResponse, onStop }) => {
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

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isWaitingForResponse) {
      onStop?.()
    } else {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-auto w-full px-4 pb-2">
      <div className="relative bg-background border border-border p-2 rounded-2xl w-full max-w-3xl mx-auto shadow-lg">
        <div className="pr-12">
          <div
            ref={divRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="text-foreground px-4 py-3 rounded-xl focus:outline-none w-full resize-none max-h-[200px] overflow-y-auto break-all whitespace-pre-wrap empty:before:content-[attr(data-placeholder)] empty:before:text-muted empty:before:pointer-events-none empty:before:absolute empty:before:whitespace-nowrap empty:before:overflow-hidden empty:before:text-ellipsis empty:before:max-w-full"
            data-placeholder="Ask about my projects..."
          />
        </div>
        <div className="absolute right-4 bottom-4">
          <button
            type="button"
            onClick={handleButtonClick}
            className={`rounded-xl w-8 h-8 flex items-center justify-center border border-border transition duration-300 ${
              isWaitingForResponse ? 'bg-destructive hover:bg-destructive/90' : 'bg-background hover:border-primary'
            }`}
          >
            {isWaitingForResponse ? (
              <div className="w-3 h-3 bg-white rounded-[1px]" />
            ) : (
              <ArrowUp className="w-6 h-6 text-primary-primary" />
            )}
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-muted pt-2">Responses are generated and may be incorrect!</p>
    </form>
  )
}

export default MessageInput