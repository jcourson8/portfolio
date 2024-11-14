'use client';
import React from 'react';
import { useChat } from 'ai/react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MessageInput from '@/components/MessageInput';
import MessageDisplay from '@/components/MessageDisplay';
import LandingIntro from '@/components/LandingIntro';
import { useConversationContext } from '@/context/ConversationContext';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? params.id[0] : undefined;

  const { 
    conversations,
    isSidebarExpanded,
    setIsSidebarExpanded,
    setSelectedConversation,
    createNewConversation,
    updateConversation,
  } = useConversationContext();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    id,
    initialMessages: id ? conversations.find(conv => conv.id === id)?.messages || [] : [],
    onFinish: (message) => {
      if (id) {
        updateConversation(id, messages);
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 relative">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          selectedConversation={id || null}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Header 
            toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
            showMenuButton={true} 
          />
          <div className="flex-1 overflow-y-auto">
            {id ? (
              <MessageDisplay 
                messages={messages} 
                isLoading={isLoading}
              />
            ) : (
              <LandingIntro />
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-background">
            <div className={`${isSidebarExpanded ? 'md:pl-64' : ''} transition-all duration-300`}>
              <MessageInput 
                value={input}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading} 
                onStop={stop}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}