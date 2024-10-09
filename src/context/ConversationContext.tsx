'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useConversations } from '@/hooks/useConversations';

interface ConversationContextType extends ReturnType<typeof useConversations> {
    pendingMessage: { conversationId: string; message: string } | null;
    setPendingMessage: React.Dispatch<React.SetStateAction<{ conversationId: string; message: string } | null>>;
  }

const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const conversationStore = useConversations();
  const [pendingMessage, setPendingMessage] = useState<{ conversationId: string; message: string } | null>(null);

  const value = {
    ...conversationStore,
    pendingMessage,
    setPendingMessage,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationProvider');
  }
  return context;
};