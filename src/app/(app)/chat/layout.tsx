import React from 'react';
import { ConversationProvider } from '@/context/ConversationContext';
import { Suspense } from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConversationProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Loading...</div>
        </div>
      }>
        {children}
      </Suspense>
    </ConversationProvider>
  );
};

export default ChatLayout;