import React, { useEffect, useRef, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Message, useChatStore } from 'src/stores/chat'
import 'react-photo-view/dist/react-photo-view.css'
import OpenAIIcon from '../../assets/icons/openai-logomark.svg'
import { User2, Loader } from 'lucide-react'
import { imageStore } from 'src/lib/image-persist'

export const MessageList: React.FC = () => {
  const { messages, fixBrokenMessage } = useChatStore()
  const messageListRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fixBrokenMessage()
  }, [fixBrokenMessage])

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, [messages])

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }

  return (
    <div className="h-full flex-1 overflow-y-auto pb-[120px]" ref={messageListRef} style={{ scrollBehavior: 'smooth' }}>
      <PhotoProvider>
        {messages.map((message, index) => (
          <ChatItem {...message} key={index} />
        ))}
      </PhotoProvider>
    </div>
  )
}

const ChatItem = ({ type, content, isLoading }: Message) => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    ;(async () => {
      const image = await imageStore.retrieveImage(content)
      setSrc(image || '')
    })()
  }, [content])

  return (
    <div className="border-b border-gray-200 p-4 odd:bg-gray-50 last-of-type:border-none">
      <div className="mb-4 flex items-center gap-2">
        {type === 'assistant' ? (
          <>
            <div className="w-6">
              <OpenAIIcon />
            </div>
            DALL·E 3
          </>
        ) : (
          <>
            <User2 />
            User
          </>
        )}
      </div>
      {isLoading ? <Loader className="animate-spin" /> : null}
      {type === 'user' ? (
        content
      ) : (
        <>
          {src && (
            <PhotoView src={src}>
              <img src={src} className="w-[200px] cursor-pointer md:w-[300px]"></img>
            </PhotoView>
          )}
        </>
      )}
    </div>
  )
}
