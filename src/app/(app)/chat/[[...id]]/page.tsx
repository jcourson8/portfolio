'use client';

import React, { useEffect } from 'react';
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
    data, // Add this for streaming data
  } = useChat({
    id,
    initialMessages: id 
      ? conversations.find(conv => conv.id === id)?.messages || [] 
      : [],
    onFinish: (message) => {
      if (id) {
        updateConversation(id, messages);
      }
    },
    onResponse: (response) => {
      if (!id) {
        const newId = createNewConversation();
        updateConversation(newId, messages);
      }
    },
    body: {
      id,
      // Add any additional context you want to send to the API
    },
    // Enable multi-step tool calling
    maxSteps: 3,
  });

  // Save messages whenever they change
  useEffect(() => {
    if (id && messages.length > 0) {
      updateConversation(id, messages);
    }
  }, [id, messages]);

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
          <div className="flex-1 overflow-y-auto relative pb-[100px] md:pb-0">
            {id ? (
              <MessageDisplay 
                messages={messages} 
                isLoading={isLoading}
                streamingData={data}
              />
            ) : (
              <LandingIntro />
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-background md:relative">
            <div className={`transition-all duration-300`}>
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