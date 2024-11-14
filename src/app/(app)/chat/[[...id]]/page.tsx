'use client';

import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MessageInput from '@/components/MessageInput';
import MessageDisplay from '@/components/MessageDisplay';
import LandingIntro from '@/components/LandingIntro';
import { useConversationContext } from '@/context/ConversationContext';
import { Message } from '@/types';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params.id ? params.id[0] : undefined;
  const [activeId, setActiveId] = useState<string | undefined>(routeId);

  const { 
    conversations,
    isSidebarExpanded,
    setIsSidebarExpanded,
    createNewConversation,
    updateConversation,
  } = useConversationContext();

  // Custom submit handler to manage navigation and message flow
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeId) {
      const newId = createNewConversation(); // This includes router.push
      setActiveId(newId);
      // Wait for next tick to ensure navigation has started
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    handleSubmit(e);
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    data,
  } = useChat({
    id: activeId,
    initialMessages: routeId 
      ? conversations.find(conv => conv.id === routeId)?.messages || [] 
      : [],
    onFinish: (message: Message) => {
      if (activeId) {
        updateConversation(activeId, messages);
      }
    },
    onResponse: (response: any) => {
      // Remove navigation from here since it's handled in handleMessageSubmit
      if (!activeId) {
        updateConversation(activeId!, messages);
      }
    },
    body: {
      id: activeId,
    },
    maxSteps: 3,
  });

  // Sync activeId with route changes
  useEffect(() => {
    setActiveId(routeId);
  }, [routeId]);

  // Save messages whenever they change
  useEffect(() => {
    if (activeId && messages.length > 0) {
      updateConversation(activeId, messages);
    }
  }, [activeId, messages]);

  return (
    <div className="flex h-[100dvh] flex-col">
      <Header 
        toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
        showMenuButton={true} 
      />
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          selectedConversation={activeId || null}
        />
        <div className="flex-1 flex flex-col relative w-full">
          <div className="flex-1 overflow-hidden">
            {activeId ? (
              <MessageDisplay 
                messages={messages} 
                isLoading={isLoading}
                streamingData={data}
              />
            ) : (
              <LandingIntro />
            )}
          </div>
          <div className="relative bg-background">
            <MessageInput 
              value={input}
              onChange={handleInputChange}
              onSubmit={handleMessageSubmit}
              isLoading={isLoading} 
              onStop={stop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}