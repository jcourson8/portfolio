import React from 'react';
import { ConversationProvider } from '@/context/ConversationContext';
import { Suspense } from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConversationProvider>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ConversationProvider>
  );
};

export default ChatLayout;