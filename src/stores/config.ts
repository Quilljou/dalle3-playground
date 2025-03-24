import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ImageGenerateParams } from 'openai/resources'

type Defined<T> = T extends undefined ? never : T

export type Quality = Defined<ImageGenerateParams['quality']>
export type Model = 'dall-e-2' | 'dall-e-3'
export type Style = Defined<ImageGenerateParams['style']>
export type Size = `1024x1024` | `1792x1024` | `1024x1792`

type ConfigStore = {
  apiKey: string
  setAPIKey: (key: string) => void

  quality: Quality
  setQuality: (quality: Quality) => void

  style: Style
  setStyle: (style: Style) => void

  size: Size
  setSize: (style: Size) => void

  model: Model
  setModel: (model: Model) => void

  useAzure: boolean
  setUseAzure: (useAzure: boolean) => void
  azureEndpoint: string
  setAzureEndpoint: (endpoint: string) => void
  azureDeploymentName: string
  setAzureDeploymentName: (name: string) => void

  reset: () => void
}

const DEFAULT_CONFIG: Pick<ConfigStore, 'model' | 'quality' | 'size' | 'style' | 'useAzure'> = {
  model: 'dall-e-3',
  quality: 'standard',
  style: 'vivid',
  size: '1024x1024',
  useAzure: false,
}

export const useConfigStore = create(
  persist<ConfigStore>(
    (set, get) => ({
      ...DEFAULT_CONFIG,
      apiKey: '',
      azureEndpoint: '',
      azureDeploymentName: '',

      setAPIKey(key) {
        set({ apiKey: key })
      },
      setQuality(quality) {
        set({ quality })
      },
      setStyle(style) {
        set({ style })
      },
      setSize(size) {
        set({ size })
      },
      setModel(model) {
        set({ model })
      },
      setUseAzure(useAzure) {
        set({ useAzure })
      },
      setAzureEndpoint(azureEndpoint) {
        set({ azureEndpoint })
      },
      setAzureDeploymentName(azureDeploymentName) {
        set({ azureDeploymentName })
      },
      reset() {
        set({ ...DEFAULT_CONFIG })
      },
    }),
    {
      name: 'config-storage',
    },
  ),
)
