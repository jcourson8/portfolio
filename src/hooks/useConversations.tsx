import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem('conversations');
    if (storedConversations) {
      const parsedConversations = JSON.parse(storedConversations);
      setConversations(parsedConversations);
      setIsSidebarExpanded(parsedConversations.length > 0);
    }
  }, []);

  // Save conversations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const addMessageToConversation = (message: Message, conversationId: string) => {
    setConversations(prev => {
      const updated = prev.map(conv =>
        conv.id === conversationId ? { ...conv, messages: [...conv.messages, message] } : conv
      );
      if (!updated.some(conv => conv.id === conversationId)) {
        updated.push({ id: conversationId, messages: [message] });
      }
      return updated;
    });
    setSelectedConversation(conversationId);
    setIsSidebarExpanded(true);
  };

  const updateMessageInConversation = (conversationId: string, messageId: string, updates: Partial<Message>) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: conv.messages.map(msg => (msg.id === messageId ? { ...msg, ...updates } : msg)),
        };
      }
      return conv;
    }));
  };

  const getLatestMessage = (conversationId: string): Message | null => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    return conversation?.messages[conversation.messages.length - 1] || null;
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const createNewConversation = (): string => {
    const newId = Date.now().toString();
    setConversations(prev => [...prev, { id: newId, messages: [] }]);
    setSelectedConversation(newId);
    return newId;
  };

  const getConversation = (id: string): Message[] => {
    return conversations.find(conv => conv.id === id)?.messages || [];
  };

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    addMessageToConversation,
    deleteConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    createNewConversation,
    getConversation,
    updateMessageInConversation,
    getLatestMessage,
  };
}
