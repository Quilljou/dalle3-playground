import { useConfigStore } from 'src/stores/config'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useChatStore } from 'src/stores/chat'

export const InputKeyDialog = () => {
  const { setAPIKey, apiKey } = useConfigStore()
  const { isShowingApiKeyDialog, toggleApiKeyDialog } = useChatStore()

  return (
    <Dialog open={isShowingApiKeyDialog} onOpenChange={toggleApiKeyDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>Please enter your OpenAI API key below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="apikey">
              API Key
            </Label>
            <Input
              className="col-span-3"
              id="apikey"
              required
              type="password"
              value={apiKey}
              onChange={(e) => setAPIKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
