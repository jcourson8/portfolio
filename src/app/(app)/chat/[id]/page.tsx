'use client';

import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MessageInput from '@/components/MessageInput'
import MessageDisplay from '@/components/MessageDisplay'

import { Message } from '@/types'
import { readDataStream } from 'ai'
import { useConversationContext } from '@/context/ConversationContext';

export default function ChatPage() {
  const params = useParams();
  const id = params.id as string;

  const { 
    conversations, 
    addMessageToConversation,
    updateLastMessage,
    deleteConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    getConversation,
    setSelectedConversation,
    pendingMessage,
    setPendingMessage,
  } = useConversationContext();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(getConversation(id));
    setSelectedConversation(id);

    if (pendingMessage && pendingMessage.conversationId === id) {
      handleSendMessage(pendingMessage.message);
      setPendingMessage(null);
    }
  }, [id, pendingMessage, getConversation, setSelectedConversation, setPendingMessage]);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      user_id: 'user',
      timestamp: Date.now(),
    };

    addMessageToConversation(newMessage, id);

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, conversationId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to read response');
      }

      const botResponseId = Date.now().toString();
      const botMessage: Message = {
        id: botResponseId,
        text: '',
        user_id: 'bot',
        timestamp: Date.now(),
      };
      addMessageToConversation(botMessage, id);
      setMessages(prev => [...prev, botMessage]);

      let fullResponse = '';
      for await (const { type, value } of readDataStream(reader)) {
        if (type === 'text') {
          fullResponse += value;
          updateLastMessage(id, { text: fullResponse });
          setMessages(prev => prev.map(msg => 
            msg.id === botResponseId ? { ...msg, text: fullResponse } : msg
          ));
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark flex h-screen bg-neutral-900 text-white">
      <div className="flex flex-1 relative">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          conversations={conversations}
          selectedConversation={id}
          setSelectedConversation={setSelectedConversation}
          deleteConversation={deleteConversation}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-0'}`}>
          <Header />
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            <MessageDisplay messages={messages} />
          </div>
          <MessageInput sendMessage={handleSendMessage} isWaitingForResponse={isLoading} />
        </div>
      </div>
    </div>
  );
}