import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onStop?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  onStop
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current && containerRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 200); // Max height of 200px
      textareaRef.current.style.height = `${newHeight}px`;
      containerRef.current.style.height = `${Math.max(newHeight + 32, 64)}px`; // 32px for padding, min height of 64px
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <form onSubmit={onSubmit} className="mt-auto w-full px-4 pb-2">
      <div 
        ref={containerRef}
        className="relative flex items-center bg-background/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl w-full max-w-3xl mx-auto shadow-lg transition-all duration-200 ease-in-out"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my projects..."
          className="flex-1 bg-transparent text-foreground focus:outline-none w-full resize-none overflow-y-auto ml-2"
          rows={1}
        />
        <button
          type="button"
          onClick={isLoading ? onStop : (e) => onSubmit(e)}
          className={`ml-4 rounded-xl w-8 h-8 flex items-center justify-center border border-border/50 transition duration-300 mt-auto ${
            isLoading ? 'bg-destructive hover:bg-destructive/90' : 'bg-background/50 hover:border-primary hover:bg-background'
          }`}
        >
          {isLoading ? (
            <div className="w-3 h-3 bg-primary rounded-[1px]" />
          ) : (
            <ArrowUp className="w-6 h-6 text-primary stroke-1" />
          )}
        </button>
      </div>
      <p className="text-center text-xs text-muted pt-2">
        Responses are generated and may be incorrect!
      </p>
    </form>
  );
};

export default MessageInput;