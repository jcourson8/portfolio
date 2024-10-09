import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message } from '@/types';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const storedConversations = localStorage.getItem('conversations');
    const storedSelectedConversation = localStorage.getItem('selectedConversation');
    
    if (storedConversations) {
      const parsedConversations = JSON.parse(storedConversations);
      setConversations(parsedConversations);
      setIsSidebarExpanded(parsedConversations.length > 0);
    }
    
    if (storedSelectedConversation) {
      setSelectedConversation(storedSelectedConversation);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (selectedConversation) {
      localStorage.setItem('selectedConversation', selectedConversation);
    } else {
      localStorage.removeItem('selectedConversation');
    }
  }, [selectedConversation]);

  const addMessageToConversation = (message: Message, conversationId: string) => {
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      );
      if (!updatedConversations.some(conv => conv.id === conversationId)) {
        updatedConversations.push({
          id: conversationId,
          messages: [message],
        });
      }
      return updatedConversations;
    });
    setSelectedConversation(conversationId);
    setIsSidebarExpanded(true);
  };

  const updateLastMessage = (conversationId: string, updatedMessage: Partial<Message>) => {
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.id === conversationId && conv.messages.length > 0) {
          const lastMessageIndex = conv.messages.length - 1;
          const updatedMessages = [...conv.messages];
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            ...updatedMessage,
          };
          return { ...conv, messages: updatedMessages };
        }
        return conv;
      });
    });
  };

  const deleteConversation = (id: string) => {
    setConversations(prevConversations => prevConversations.filter(conv => conv.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const createNewConversation = (): string => {
    const newConversationId = Date.now().toString();
    setConversations(prevConversations => [
      ...prevConversations,
      { id: newConversationId, messages: [] }
    ]);
    setSelectedConversation(newConversationId);
    return newConversationId;
  };

  const getCurrentConversation = (): Message[] => {
    return conversations.find(conv => conv.id === selectedConversation)?.messages || [];
  };

  const getConversation = useCallback((id: string): Message[] => {
    return conversations.find(conv => conv.id === id)?.messages || [];
  }, [conversations]);

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    addMessageToConversation,
    updateLastMessage,
    deleteConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    createNewConversation,
    getCurrentConversation,
    getConversation,  // Add this new function to the returned object
  };
}