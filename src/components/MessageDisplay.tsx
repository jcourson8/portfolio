import { Message } from "@/types";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRender";
import { ChevronDown } from 'lucide-react';

// Bot message component
const BotMessage: React.FC<{ message: Message; isCurrent: boolean }> = ({ message, isCurrent }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isCurrent && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [message.text, isCurrent])

  return (
    <div className="w-full flex items-start space-x-2">
      <div className="flex-shrink-0">
        <div className="rounded-full p-3 bg-primary mr-2"></div>
      </div>
      <div className="flex-grow" ref={contentRef}>
        <MarkdownRenderer content={message.text} />
      </div>
    </div>
  )
}

// User message component
const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
  <div className="w-3/4 ml-auto">
    <div className="bg-background border border-border rounded-lg p-3 shadow-sm">
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
    </div>
  </div>
)

// Main message display component
interface MessageDisplayProps {
  messages: Message[]
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const scrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;
      setIsAtBottom(scrolledToBottom);
      setShowScrollButton(!scrolledToBottom);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  return (
    <div className="w-full px-4 h-full relative">
      <div 
        ref={scrollContainerRef} 
        className="overflow-y-auto h-full pt-4 pb-16"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) =>
            message.user_id === 'bot' ? (
              <BotMessage
                key={message.id}
                message={message}
                isCurrent={index === messages.length - 1 && message.user_id === 'bot'}
              />
            ) : (
              <UserMessage key={message.id} message={message} />
            ),
          )}
        </div>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 translate-y-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full p-1.5 border border-secondary opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out shadow-lg z-10"
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={24} />
        </button>
      )}
    </div>
  )
}

export default MessageDisplay
