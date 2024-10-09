import React from 'react';
import { Message } from '@/types';

interface MessageDisplayProps {
  messages: Message[]
}

const BotMessage: React.FC<{ message: Message; isCurrent: boolean }> = ({ message, isCurrent }) => (
  <div className="w-full flex items-start space-x-2">
    <div className="flex-shrink-0">
      <div className="rounded-full p-3 bg-primary mr-2"></div>
    </div>
    <div className="flex-grow">
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
    </div>
  </div>
)

const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
  <div className="w-3/4 ml-auto">
    <div className="bg-neutral-700 rounded-md p-3">
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
    </div>
  </div>
)

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      {messages.map((message, index) =>
        message.user_id === 'bot' ? (
          <BotMessage
            key={message.id}
            message={message}
            isCurrent={index === messages.length - 1 && message.user_id === 'bot'}
          />
        ) : (
          <UserMessage key={message.id} message={message} />
        )
      )}
    </div>
  )
}

export default MessageDisplay;