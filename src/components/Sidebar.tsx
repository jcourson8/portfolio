'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import TrashIcon from './icons/TrashIcon'
import { Conversation } from '@/types';


interface SidebarProps {
  isExpanded: boolean
  toggleSidebar: () => void
  conversations: Conversation[]
  selectedConversation: string | null
  setSelectedConversation: (id: string | null) => void
  deleteConversation: (id: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  toggleSidebar,
  conversations,
  selectedConversation,
  setSelectedConversation,
  deleteConversation
}) => {
  const router = useRouter();

  const handleConversationClick = (id: string) => {
    setSelectedConversation(id);
    router.push(`/chat/${id}`);
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    if (id === selectedConversation) {
      setSelectedConversation(null);
      router.push('/');
    }
  };

  return (
    <div className="absolute left-0 top-0 h-full">
      <div
        className={`bg-neutral-900 text-white shadow-lg transition-all duration-300 ease-in-out h-full ${
          isExpanded ? 'w-64 border-r border-secondary' : 'w-0'
        } overflow-hidden`}
      >
        <div className={`p-5 ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <h3 className="text-md font-semibold mb-4">Conversations</h3>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-2 cursor-pointer rounded-md flex justify-between items-center ${
                selectedConversation === conv.id ? 'bg-neutral-800' : 'hover:bg-neutral-800'
              }`}
            >
              <div
                onClick={() => handleConversationClick(conv.id)}
                className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {conv.messages[0]?.text.substring(0, 30) || 'New Conversation'}...
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConversation(conv.id);
                }}
                className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`absolute top-1/2 transform -translate-y-1/2 p-2 text-secondary hover:text-primary transition-all duration-300 ease-in-out ${
          isExpanded ? 'left-64' : 'left-0'
        }`}
        onClick={toggleSidebar}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </div>
  )
}

export default Sidebar