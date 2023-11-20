import { ImageGenerateParams } from 'openai/resources'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useConfigStore } from './config'
import OpenAI from 'openai'
import { imageStore } from 'src/lib/image-persist'

export interface Message {
  type: 'user' | 'assistant'
  content: string
  isError: boolean
  isLoading?: boolean
}

type ChatStore = {
  messages: Message[]
  isGenerating: boolean
  inputPrompt: string

  isShowingApiKeyDialog: boolean
  toggleApiKeyDialog: (value: boolean) => any

  isShowingSettingFormSheet: boolean
  toggleSettingFormSheet: (value: boolean) => any

  onInputChange: (message: string) => any
  addMessage: () => any
  fixBrokenMessage: () => any
}

export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      messages: [],
      isGenerating: false,
      inputPrompt: '',

      isShowingApiKeyDialog: false,
      toggleApiKeyDialog(value) {
        set({ isShowingApiKeyDialog: value })
      },

      isShowingSettingFormSheet: false,
      toggleSettingFormSheet(value) {
        set({ isShowingSettingFormSheet: value })
      },

      onInputChange(inputPrompt) {
        set(() => ({ inputPrompt }))
      },
      async addMessage() {
        const { style, size, apiKey, quality } = useConfigStore.getState()
        if (!apiKey) {
          get().toggleApiKeyDialog(true)
          return
        }

        if (get().isGenerating) return

        set(() => ({
          isGenerating: true,
          messages: [
            ...get().messages,
            { type: 'user', content: get().inputPrompt, isError: false },
            { type: 'assistant', content: '', isError: false, isLoading: true },
          ],
        }))
        const openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true,
        })
        const options: ImageGenerateParams = {
          prompt: get().inputPrompt,
          model: 'dall-e-3',
          n: 1,
          response_format: 'b64_json',
          size: size,
          style: style,
          quality: quality,
        }
        try {
          const completion = await openai.images.generate(options)
          const base64 = completion.data[0].b64_json
          if (!base64) throw new Error('invalid base64')
          const key = await imageStore.storeImage('data:image/png;base64,' + base64)
          set(() => ({
            inputPrompt: '',
            messages: [
              ...get().messages.slice(0, -1),
              {
                type: 'assistant',
                content: key,
                isError: false,
              },
            ],
          }))
        } catch (error: any) {
          set(() => ({
            messages: [
              ...get().messages.slice(0, -1),
              {
                type: 'assistant',
                content: error.message || 'Unknown error',
                isError: false,
              },
            ],
          }))
          console.error(error)
        } finally {
          set(() => ({ isGenerating: false }))
        }
      },
      fixBrokenMessage() {
        const lastMessage = get().messages[get().messages.length - 1]
        if (lastMessage?.isLoading) {
          set(() => ({
            messages: get().messages.slice(0, -1),
          }))
        }
      },
      clearMessages() {
        set(() => ({ messages: [] }))
        imageStore.clear()
      },
    }),
    {
      name: 'chat-store',
      //@ts-ignore TODO:
      partialize: (state) => ({ messages: state.messages }),
    },
  ),
)
