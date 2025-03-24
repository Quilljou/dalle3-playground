import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Model, Quality, Size, Style, useConfigStore } from 'src/stores/config'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { HelpCircle } from 'lucide-react'
import { ImageModel } from 'openai/resources'
import { Switch } from 'src/components/ui/switch'
import { Label } from 'src/components/ui/label'
const sizes: Size[] = ['1024x1024', '1792x1024', '1024x1792']
const qualities: Quality[] = ['standard', 'hd']
const styles: Style[] = ['vivid', 'natural']
const models: Model[] = ['dall-e-2', 'dall-e-3']

export const SettingForm = () => {
  const {
    quality,
    setQuality,
    size,
    setSize,
    style,
    setStyle,
    apiKey,
    setAPIKey,
    model,
    setModel,
    reset,
    useAzure,
    setUseAzure,
    azureEndpoint,
    setAzureEndpoint,
    azureDeploymentName,
    setAzureDeploymentName,
  } = useConfigStore()

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex items-center justify-start border-b border-gray-200">
        Settings
        <Button size={'icon'} asChild variant={'ghost'}>
          <a href="https://platform.openai.com/docs/api-reference/images/create" target="_blank" rel="noreferrer">
            <HelpCircle size={16} />
          </a>
        </Button>
      </div>

      <div>
        <label className="block py-2">Model</label>
        <Select value={model} onValueChange={(value) => setModel(value as ImageModel)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {models.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block py-2">Quality</label>
        <Select value={quality} onValueChange={(value) => setQuality(value as Quality)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {qualities.map((item) => (
                <SelectItem value={item} key={item}>
                  {item?.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block py-2">Size</label>
        <Select value={size} onValueChange={(value) => setSize(value as Size)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sizes.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block py-2">Style</label>
        <Select value={style!} onValueChange={(value) => setStyle(value as Style)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {styles.map((item) => (
                <SelectItem value={item!} key={item}>
                  {item?.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block py-2">API Key</label>
        <Input value={apiKey} onChange={(e) => setAPIKey(e.target.value)} type="password"></Input>
      </div>

      <div>
        <label className="block py-2">API Type</label>
        <div className="flex items-center space-x-2">
          <Switch id="use-azure" checked={useAzure} onCheckedChange={setUseAzure} />
          <Label htmlFor="use-azure">Use Azure OpenAI</Label>
        </div>
      </div>

      {useAzure ? (
        <>
          <div>
            <label className="block py-2">Azure API Key</label>
            <Input value={apiKey} onChange={(e) => setAPIKey(e.target.value)} type="password"></Input>
          </div>

          <div>
            <label className="block py-2">Azure Endpoint</label>
            <Input
              value={azureEndpoint}
              onChange={(e) => setAzureEndpoint(e.target.value)}
              placeholder="https://your-resource.openai.azure.com"
            ></Input>
          </div>

          <div>
            <label className="block py-2">Azure Deployment Name</label>
            <Input
              value={azureDeploymentName}
              onChange={(e) => setAzureDeploymentName(e.target.value)}
              placeholder="your-dalle3-deployment"
            ></Input>
          </div>
        </>
      ) : (
        <div>
          <label className="block py-2">OpenAI API Key</label>
          <Input value={apiKey} onChange={(e) => setAPIKey(e.target.value)} type="password"></Input>
        </div>
      )}

      {!useAzure && (
        <div>
          <label className="block py-2">Model</label>
          <Select value={model} onValueChange={(value) => setModel(value as ImageModel)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {models.map((item) => (
                  <SelectItem value={item} key={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={reset} variant={'link'} className="underline">
          Reset to default
        </Button>
      </div>
    </div>
  )
}
