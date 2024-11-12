'use client';

import React, { useRef, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MessageInput from '@/components/MessageInput'
import MessageDisplay from '@/components/MessageDisplay'
import LandingIntro from '@/components/LandingIntro'

import { Message } from '@/types'
import { readDataStream } from 'ai'
import { useConversationContext } from '@/context/ConversationContext';
import { v4 as uuidv4} from 'uuid';
  
export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? params.id[0] : undefined;

  const { 
    conversations, 
    addMessageToConversation,
    updateMessageInConversation,
    deleteConversation,
    isSidebarExpanded,
    setIsSidebarExpanded,
    setSelectedConversation,
    createNewConversation,
  } = useConversationContext();

  const [isClient, setIsClient] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const lastProcessedMessageIdRef = useRef<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    setIsClient(true);
    const savedSidebarState = localStorage.getItem('sidebarExpanded');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(JSON.parse(savedSidebarState));
    }
  }, [setIsSidebarExpanded]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded));
    }
  }, [isSidebarExpanded, isClient]);

  useEffect(() => {
    if (id) {
      const conversation = conversations.find(conv => conv.id === id);
      
      if (!conversation) {
        router.replace('/chat');
        return;
      }

      const conversationMessages = conversation?.messages || [];
      setMessages(conversationMessages);
      setSelectedConversation(id);
  
      const latestMessage = conversationMessages.length > 0
        ? conversationMessages[conversationMessages.length - 1]
        : null;
  
      if (
        latestMessage &&
        latestMessage.pending &&
        latestMessage.id !== lastProcessedMessageIdRef.current
      ) {
        lastProcessedMessageIdRef.current = latestMessage.id;
        processMessage(latestMessage.text, id, latestMessage.id);
      }
    } else {
      setMessages([]);
      setSelectedConversation(null);
    }
  }, [id, conversations, router]);

  const handleSendMessage = async (message: string) => {
    const newMessageId = uuidv4();
    const newMessage: Message & { pending?: boolean } = {
      id: newMessageId,
      text: message,
      user_id: 'user',
      timestamp: Date.now(),
      pending: true,
    };
  
    let currentId = id;
    if (!currentId) {
      currentId = createNewConversation();
      addMessageToConversation(newMessage, currentId);
      router.replace(`/chat/${currentId}`);
      // Do not call processMessage here
    } else {
      addMessageToConversation(newMessage, currentId);
      // Do not call processMessage here
    }
  };  

  const stopProcessing = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setIsLoading(false);
    }
  };

  const processMessage = async (message: string, conversationId: string, messageId: string) => {
    setIsLoading(true);
    const abortController = new AbortController();
    setController(abortController);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { text: message, user_id: 'user' }], conversationId }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to read response');
      }

      updateMessageInConversation(conversationId, messageId, { pending: false });

      const botResponseId = Date.now().toString();
      const botMessage: Message = {
        id: botResponseId,
        text: '',
        user_id: 'bot',
        timestamp: Date.now(),
      };
      addMessageToConversation(botMessage, conversationId);
      setMessages(prev => [...prev, botMessage]);

      let fullResponse = '';
      for await (const { type, value } of readDataStream(reader)) {
        if (type === 'text') {
          fullResponse += value;
          updateMessageInConversation(conversationId, botResponseId, { text: fullResponse });
          setMessages(prev => prev.map(msg => 
            msg.id === botResponseId ? { ...msg, text: fullResponse } : msg
          ));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setIsLoading(false);
      setController(null);
    }
  };

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div className="dark flex h-screen">
      <div className="flex flex-1 relative">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          selectedConversation={id || null}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Header />
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            {id ? (
              <MessageDisplay messages={messages} />
            ) : (
              <LandingIntro />
            )}
          </div>
          <MessageInput 
            sendMessage={handleSendMessage} 
            isWaitingForResponse={isLoading} 
            onStop={stopProcessing} 
          />
        </div>
      </div>
    </div>
  );
}