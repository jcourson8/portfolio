import { Message } from "@/types";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRender";

interface ToolCallDisplayProps {
  tool: {
    toolName: string;
    args: any;
    result?: any;
  };
}

const ToolCallDisplay: React.FC<ToolCallDisplayProps> = ({ tool }) => {
  let toolDescription;
  const [isExpanded, setIsExpanded] = useState(false);

  switch (tool.toolName) {
    case 'getFormattedProjects':
      toolDescription = 'Looking up projects...';
      break;
    default:
      toolDescription = `Using ${tool.toolName}`;
  }

  return (
    <div className="py-1 px-3 mt-2 mr-4 rounded-xl bg-muted/10 border border-border inline-block max-w-full">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 hover:opacity-80"
      >
        {toolDescription}
        <span className="text-xs ml-1">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-2 text-sm text-muted-foreground">
          {tool.result && (
            <>
              <pre className="whitespace-pre-wrap break-words max-w-[calc(100vw-8rem)] overflow-x-auto">
                {tool.result?.summary?.split('\\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < tool.result.summary.split('\\n').length - 1 && <br />}
                  </span>
                )) || JSON.stringify(tool.result.summary, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface MessageDisplayProps {
  messages: Message[];
  isLoading?: boolean;
  streamingData?: any;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  messages, 
  isLoading,
  streamingData 
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingData]);

  console.log(messages);

  return (
    <div className="h-full overflow-y-auto overscroll-none -webkit-overflow-scrolling-touch">
      <div className="w-full px-4">
        <div className="max-w-3xl mx-auto py-4">
          {messages.map((message: Message, index: number) => {
            const nextMessage = messages[index + 1];
            const prevMessage = messages[index - 1];
            const isConsecutiveAI = message.role === 'assistant' && nextMessage?.role === 'assistant';
            const isPreviousAI = message.role === 'assistant' && prevMessage?.role === 'assistant';
            
            return (
              <div 
                key={message.id} 
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } ${isConsecutiveAI ? 'mb-1' : 'mb-4'}`}
              >
                <div className={`${
                  message.role === 'user' 
                    ? 'bg-primary/5' 
                    : ''
                } rounded-xl px-4 ${
                  isPreviousAI ? 'pt-1' : 'pt-3'
                } ${
                  isConsecutiveAI ? 'pb-1' : 'pb-3'
                }`}>
                  <MarkdownRenderer content={message.content} />
                  
                  {message.toolInvocations?.map((tool: any, idx: number) => (
                    <ToolCallDisplay 
                      key={`${message.id}-tool-${idx}`} 
                      tool={tool} 
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {isLoading && !streamingData && (
            <div className="flex items-center gap-2 text-muted-foreground pl-4">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              <span>AI is thinking...</span>
            </div>
          )}
          
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;