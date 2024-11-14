import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, PlusCircle, Trash2 } from 'lucide-react'
import { useConversationContext } from '@/context/ConversationContext'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import { motion } from 'framer-motion'
import { Message } from '@/types'

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
    setIsSidebarExpanded,
  } = useConversationContext();

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) {
      setIsSidebarExpanded(false);
    }
  }, []);

  const handleConversationClick = (id: string) => {
    setSelectedConversation(id)
    router.push(`/chat/${id}`)
    if (window.innerWidth <= 768) toggleSidebar()
  }

  const handleDeleteConversation = async (id: string) => {
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

  const getConversationTitle = (messages: Message[]) => {
    if (!messages.length) return 'New Conversation';
    
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (!firstUserMessage) return 'New Conversation';
    
    const title = firstUserMessage.content.substring(0, 30);
    return title.length === 30 ? `${title}...` : title;
  }

  const renderConversationList = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      )
    }

    return (
      <>
        <div
          onClick={handleNewConversation}
          className={`
            px-3.5 py-3 cursor-pointer
            flex items-center mb-1
            rounded-lg border border-border/40
            text-muted-foreground hover:text-foreground
            hover:border-border hover:bg-accent/30
            transition-all duration-200 ease-in-out
            font-light tracking-wide
            group
          `}
        >
          <PlusCircle className="w-[15px] h-[15px] mr-3 flex-shrink-0 
            opacity-50 group-hover:opacity-100 transition-opacity" />
          <span className="flex-grow text-sm">
            New Conversation
          </span>
        </div>

        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`
              px-3.5 py-3 cursor-pointer
              flex justify-between items-center mb-2
              rounded-lg transition-all duration-200 ease-in-out
              font-light tracking-wide
              ${selectedConversation === conv.id 
                ? 'bg-accent/50 text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
              }
            `}
            onClick={() => handleConversationClick(conv.id)}
          >
            <span className="flex-grow text-sm truncate pr-2">
              {getConversationTitle(conv.messages)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteConversation(conv.id)
              }}
              className="p-1.5
                text-muted-foreground/40 hover:text-destructive 
                transition-all duration-200 rounded-md
                hover:bg-destructive/10"
            >
              <Trash2 className="w-[13px] h-[13px]" />
            </button>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <div 
        className={`
          fixed inset-0 bg-background/80 backdrop-blur-sm z-40 
          transition-all duration-300 sm:hidden
          ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `} 
        onClick={toggleSidebar}
      />

      <div className="absolute left-0 top-0 h-full md:relative">
        <motion.div
          initial={false}
          animate={{
            width: isExpanded ? '16rem' : '0',
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className={`
            h-full
            ${isExpanded ? 'border-r border-border' : ''} bg-background
            fixed md:relative z-50
            overflow-hidden
          `}
        >
          <motion.div
            initial={false}
            animate={{
              x: isExpanded ? 0 : -256,
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="w-64 h-full"
          >
            <div className="py-4 px-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-normal">Conversations</h3>
                <Button
                  onClick={toggleSidebar}
                  variant="ghost"
                  size="icon"
                  className="sm:hidden h-8 w-8"
                >
                  <div className="flex flex-col space-y-1.5">
                    <div className="w-5 h-0.5 bg-foreground rounded-full" />
                    <div className="w-4 h-0.5 bg-foreground rounded-full" />
                  </div>
                </Button>
              </div>
              <div className="space-y-1">
                {renderConversationList()}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          initial={false}
          animate={{
            left: isExpanded ? '16rem' : '0',
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className={`
            absolute top-1/2 transform -translate-y-1/2 
            text-primary opacity-50 
            hover:text-primary hover:opacity-100 
            transition-all duration-300 ease-in-out z-50 rounded-md
            hidden sm:block
            sm:m-2 ${isExpanded ? 'hover:-translate-x-1' : 'hover:translate-x-1'}
          `}
          onClick={toggleSidebar}
        >
          {isExpanded 
            ? <ChevronLeftIcon /> 
            : <ChevronRightIcon />
          }
        </motion.button>
      </div>
    </>
  )
}

export default Sidebar