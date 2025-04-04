import { ImageGenerateParams } from 'openai/resources'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useConfigStore } from './config'
import OpenAI from 'openai'
import { imageStore } from 'src/lib/image-persist'

export type ImageMeta = Pick<ImageGenerateParams, 'model' | 'quality' | 'size' | 'style'> & {
  revisedPrompt?: string
}

export interface Message {
  type: 'user' | 'assistant'
  content: string
  isError: boolean
  isLoading?: boolean
  imageMeta?: ImageMeta
  timestamp: number
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
  clearMessages: () => any
  cancelGeneration: () => any
}

let controller: AbortController

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
        const { style, size, apiKey, quality, model, useAzure, azureEndpoint, azureDeploymentName } =
          useConfigStore.getState()

        if (!apiKey) {
          get().toggleApiKeyDialog(true)
          return
        }

        if (useAzure && (!azureEndpoint || !azureDeploymentName)) {
          alert('Please configure Azure OpenAI settings')
          return
        }

        if (get().isGenerating) return

        set(() => ({
          isGenerating: true,
          messages: [
            ...get().messages,
            { type: 'user', content: get().inputPrompt, isError: false, timestamp: Date.now() },
            { type: 'assistant', content: '', isError: false, isLoading: true, timestamp: Date.now() },
          ],
        }))

        let openai
        if (useAzure) {
          openai = new OpenAI({
            apiKey: apiKey,
            baseURL: `${azureEndpoint}/openai/deployments/${azureDeploymentName}`,
            defaultQuery: { 'api-version': '2023-12-01-preview' },
            defaultHeaders: { 'api-key': apiKey },
            dangerouslyAllowBrowser: true,
          })
        } else {
          openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true,
          })
        }

        const options: ImageGenerateParams = {
          prompt: get().inputPrompt,
          model: useAzure ? undefined : model,
          n: 1,
          response_format: 'b64_json',
          size: size,
          style: style,
          quality: quality,
        }
        controller = new AbortController()
        const signal = controller.signal
        try {
          const completion = await openai.images.generate(options, {
            signal: signal,
          })
          const { b64_json: base64, revised_prompt: revisedPrompt } = completion?.data?.[0] || {}
          if (!base64) throw new Error('invalid base64')
          const key = await imageStore.storeImage('data:image/png;base64,' + base64)
          const imageMeta: ImageMeta = {
            style: useConfigStore.getState().style,
            size: useConfigStore.getState().size,
            model: useConfigStore.getState().model,
            quality: useConfigStore.getState().quality,
            revisedPrompt,
          }
          set(() => ({
            inputPrompt: '',
            messages: [
              ...get().messages.slice(0, -1),
              {
                type: 'assistant',
                content: key,
                imageMeta,
                isError: false,
                timestamp: Date.now(),
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
                isError: true,
                timestamp: Date.now(),
              },
            ],
          }))
          console.error(error)
        } finally {
          set(() => ({ isGenerating: false }))
        }
      },
      cancelGeneration() {
        controller?.abort()
        set(() => ({ isGenerating: false }))
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
