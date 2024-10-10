'use client';

import React, { createContext, useContext } from 'react';
import { useConversations } from '@/hooks/useConversations';

type ConversationContextType = ReturnType<typeof useConversations>;

const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const conversationStore = useConversations();

  return (
    <ConversationContext.Provider value={conversationStore}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }
  return context;
};