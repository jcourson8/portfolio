import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, PlusCircle, Trash2 } from 'lucide-react'
import { useConversationContext } from '@/context/ConversationContext'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'

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
  const { 
    conversations, 
    deleteConversation,
    setSelectedConversation,
    createNewConversation,
    isLoading,
  } = useConversationContext();

  // Mobile overflow handling
  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = 
        window.innerWidth <= 768 && isExpanded ? 'hidden' : 'auto';
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  const handleConversationClick = (id: string) => {
    setSelectedConversation(id)
    router.push(`/chat/${id}`)
    if (window.innerWidth <= 768) toggleSidebar()
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id)
    if (id === selectedConversation) {
      setSelectedConversation(null)
      router.push('/chat')
    }
  }

  const handleNewConversation = () => {
    const id = createNewConversation()
    router.push(`/chat/${id}`)
    if (window.innerWidth <= 768) toggleSidebar()
  }

  const renderConversationList = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      )
    }

    return conversations.map((conv) => (
      <div
        key={conv.id}
        className={`
          p-2 cursor-pointer rounded-md 
          flex justify-between items-center mb-1
          border transition-colors duration-200
          ${selectedConversation === conv.id 
            ? 'border-border text-foreground' 
            : 'border-transparent text-muted-foreground hover:border-border'
          }
        `}
        onClick={() => handleConversationClick(conv.id)}
      >
        <span className="flex-grow text-sm tracking-tight truncate pr-2">
          {conv.messages[0]?.text.substring(0, 30) || 'New Conversation'}...
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteConversation(conv.id)
          }}
          className="p-1 text-muted-foreground hover:text-destructive 
            transition-colors duration-200"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ))
  }

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`
          fixed inset-0 bg-background/80 backdrop-blur-sm z-40 
          transition-opacity duration-300 md:hidden
          ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `} 
        onClick={toggleSidebar}
      />

      {/* Sidebar container */}
      <div className="absolute left-0 top-0 h-full md:relative">
        <div
          className={`
            h-full transition-all duration-300 ease-in-out
            border-r border-border bg-background
            fixed md:relative z-50
            ${isExpanded ? 'w-64' : 'w-0'}
            overflow-hidden
          `}
        >
          {isExpanded && (
            <div className="p-5 pt-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-normal pl-2">Conversations</h3>
                <Button 
                  onClick={handleNewConversation} 
                  className="p-1 h-auto" 
                  variant="ghost"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {renderConversationList()}
              </div>
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          className={`
            absolute top-1/2 transform -translate-y-1/2 
            text-primary opacity-50 
            hover:text-primary hover:opacity-100 
            transition-all duration-300 ease-in-out z-50 m-2 rounded-md
            ${isExpanded 
              ? 'left-64 hover:-translate-x-1' 
              : 'left-0 hover:translate-x-1'
            }
          `}
          onClick={toggleSidebar}
        >
          {isExpanded 
            ? <ChevronLeftIcon /> 
            : <ChevronRightIcon />
          }
        </button>
      </div>
    </>
  )
}

export default Sidebar