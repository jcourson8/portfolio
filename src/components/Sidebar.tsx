import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import TrashIcon from './icons/TrashIcon'
import { PlusCircle } from 'lucide-react'
import { Conversation } from '@/types'
import { Button } from '@/components/ui/button'
import { useConversationContext } from '@/context/ConversationContext'

interface SidebarProps {
  isExpanded: boolean
  toggleSidebar: () => void
  selectedConversation: string | null

}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  toggleSidebar,
  selectedConversation,
}) => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

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


  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleConversationClick = (id: string) => {
    setSelectedConversation(id)
    router.push(`/${id}`)
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id)
    if (id === selectedConversation) {
      setSelectedConversation(null)
      router.push('/')
    }
  }

  const handleNewConversation = () => {
    const id = createNewConversation()
    router.push(`/${id}`)
  }

  if (!isClient) {
    return null // or a loading placeholder
  }

  return (
    <div className="absolute left-0 top-0 h-full">
      <div
        className={`shadow-lg transition-all duration-300 ease-in-out h-full ${
          isExpanded ? 'w-64 border-r border-secondary' : 'w-0'
        } overflow-hidden`}
      >
        {isExpanded && (
          <div className="p-5 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold pl-2">Conversations</h3>
              <Button 
                onClick={handleNewConversation} 
                className="p-1 h-auto" 
                variant="ghost"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-2 cursor-pointer rounded-md flex justify-between items-center mb-1 ${
                  selectedConversation === conv.id ? 'bg-neutral-800' : 'hover:bg-neutral-800'
                }`}
                onClick={() => handleConversationClick(conv.id)}
              >
                <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                  {conv.messages[0]?.text.substring(0, 30) || 'New Conversation'}...
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteConversation(conv.id)
                  }}
                  className="ml-2 p-1 text-destructive-foreground hover:text-destructive transition-colors duration-200"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className={`absolute top-1/2 transform -translate-y-1/2 text-primary opacity-50 hover:text-primary hover:opacity-100 transition-all duration-300 ease-in-out z-10 m-2 rounded-md ${
          isExpanded ? 'left-64 hover:-translate-x-1' : 'left-0 hover:translate-x-1'
        }`}
        onClick={toggleSidebar}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </div>
  )
}

export default Sidebar
