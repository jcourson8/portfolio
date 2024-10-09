'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LandingIntro from '@/components/LandingIntro'
import MessageInput from '@/components/MessageInput'
import { useConversationContext } from '@/context/ConversationContext';

export default function HomePage() {
  const router = useRouter();
  const { 
    conversations, 
    deleteConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    createNewConversation,
    setSelectedConversation,
    setPendingMessage,
  } = useConversationContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    const newConversationId = createNewConversation();
    setPendingMessage({ conversationId: newConversationId, message });
    router.push(`/chat/${newConversationId}`);
    setIsLoading(false);
  };

  return (
    <div className="dark flex h-screen bg-neutral-900 text-white">
      <div className="flex flex-1 relative">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          conversations={conversations}
          selectedConversation={null}
          setSelectedConversation={setSelectedConversation}
          deleteConversation={deleteConversation}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-0'}`}>
          <Header />
          <div className="flex-1 overflow-y-auto">
            <LandingIntro />
          </div>
          <MessageInput sendMessage={handleSendMessage} isWaitingForResponse={isLoading} />
        </div>
      </div>
    </div>
  );
}