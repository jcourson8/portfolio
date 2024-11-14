import React, { useState } from 'react';
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
  const [message, setMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-auto w-full px-4 pb-2">
      <div className="relative flex items-center bg-background/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl w-full max-w-3xl mx-auto shadow-lg">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my projects..."
          className="flex-1 bg-transparent text-foreground focus:outline-none w-full resize-none max-h-[200px] overflow-y-auto"
          rows={1}
        />
        <button
          type="button"
          onClick={isLoading ? onStop : (e) => onSubmit(e)}
          className={`ml-4 rounded-xl w-8 h-8 flex items-center justify-center border border-border/50 transition duration-300 ${
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