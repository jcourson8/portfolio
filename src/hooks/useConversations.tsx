import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        const storedConversations = localStorage.getItem('conversations');
        if (storedConversations) {
          setConversations(JSON.parse(storedConversations));
        }

        const storedSidebarState = localStorage.getItem('sidebarExpanded');
        if (storedSidebarState !== null) {
          const isLargeScreen = window.innerWidth >= 768;
          setIsSidebarExpanded(isLargeScreen && JSON.parse(storedSidebarState));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const createNewConversation = (): string => {
    const newId = uuidv4();
    const newConversation: Conversation = {
      id: newId,
      messages: []
    };
    
    setConversations(prev => [...prev, newConversation]);
    setSelectedConversation(newId);
    
    if (window.innerWidth > 768) {
      setIsSidebarExpanded(true);
    }
    
    return newId;
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const updateConversation = (id: string, messages: Message[]) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, messages } 
          : conv
      )
    );
  };

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    createNewConversation,
    deleteConversation,
    isLoading,
    updateConversation,
  };
}