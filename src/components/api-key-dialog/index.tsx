import { useConfigStore } from 'src/stores/config'
import { Input } from '../ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useChatStore } from 'src/stores/chat'
import { KeyboardEvent } from 'react'

export const APIKeyDialog = () => {
  const { setAPIKey, apiKey } = useConfigStore()
  const { isShowingApiKeyDialog, toggleApiKeyDialog } = useChatStore()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      toggleApiKeyDialog(false)
    }
  }

  return (
    <Dialog open={isShowingApiKeyDialog} onOpenChange={toggleApiKeyDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Please enter your{' '}
            <a
              href="http://platform.openai.com/account/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              OpenAI API key
            </a>
            below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="apikey">
              API Key
            </Label>
            <Input
              autoFocus
              className="col-span-3"
              id="apikey"
              required
              type="password"
              value={apiKey}
              onKeyDown={handleKeyPress}
              onChange={(e) => setAPIKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>Save Key</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
