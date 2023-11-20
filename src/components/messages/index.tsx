import React, { useEffect, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Message, useChatStore } from 'src/stores/chat'
import 'react-photo-view/dist/react-photo-view.css'
import OpenAIIcon from '../../assets/icons/openai-logomark.svg'
import { User2, Loader } from 'lucide-react'
import { imageStore } from 'src/lib/image-persist'

export const MessageList: React.FC = () => {
  const { messages, fixBrokenMessage } = useChatStore()

  useEffect(() => {
    fixBrokenMessage()
  }, [fixBrokenMessage])

  return (
    <PhotoProvider>
      {messages.map((message, index) => (
        <ChatItem {...message} key={index} />
      ))}
    </PhotoProvider>
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
    <div className="border-b border-gray-200 p-4 odd:bg-gray-50">
      <div className="mb-4 w-8">{type === 'assistant' ? <OpenAIIcon /> : <User2 />}</div>
      {isLoading ? <Loader className="animate-spin" /> : null}
      {type === 'user' ? (
        content
      ) : (
        <PhotoView src={src}>
          <img src={src} className="w-[200px] cursor-pointer md:w-[300px]"></img>
        </PhotoView>
      )}
    </div>
  )
}
