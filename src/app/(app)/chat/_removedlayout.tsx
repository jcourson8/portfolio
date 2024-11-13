import React from 'react';
import { ConversationProvider } from '@/context/ConversationContext';
import { Suspense } from 'react';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConversationProvider>
        {children}
      </ConversationProvider>
    </Suspense>
  );
};

export default ChatLayout;