import { Message } from "@/types";
import { useEffect, useRef } from "react";
import MarkdownRenderer from "./MarkdownRender";

const ToolInvocation: React.FC<{ tool: any }> = ({ tool }) => (
  <div className="my-2 p-2 rounded bg-muted/50 border border-border">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
        🔧 {tool.toolName}
      </span>
    </div>
    {tool.result && (
      <div className="mt-2 text-sm">
        <pre className="bg-muted p-2 rounded">
          {JSON.stringify(tool.result, null, 2)}
        </pre>
      </div>
    )}
  </div>
);

const MessageContent: React.FC<{ message: Message; isCurrent: boolean }> = ({ message, isCurrent }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCurrent && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message.content, isCurrent]);

  return (
    <div className={`w-full flex items-start space-x-2 ${
      message.role === 'user' ? 'justify-end' : ''
    }`}>
      {message.role === 'assistant' && (
        <div className="flex-shrink-0">
          <div className="rounded-full p-3 bg-primary mr-2"></div>
        </div>
      )}
      <div className={`flex-grow ${message.role === 'user' ? 'w-3/4 ml-auto' : ''}`} ref={contentRef}>
        <div className={message.role === 'user' ? 'bg-background border border-border rounded-lg p-3 shadow-sm' : ''}>
          <MarkdownRenderer content={message.content} />
          {message.toolInvocations?.map((tool, index) => (
            <ToolInvocation key={`${tool.toolName}-${index}`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface MessageDisplayProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages, isLoading }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full px-4 relative h-full">
      <div ref={scrollContainerRef} className="overflow-y-auto h-full pb-16 pt-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <MessageContent
              key={message.id}
              message={message}
              isCurrent={index === messages.length - 1}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
