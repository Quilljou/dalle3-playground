import { Button } from '../ui/button'
import { Loader2, SendIcon, Trash2 } from 'lucide-react'
import { useChatStore } from 'src/stores/chat'
import { Textarea } from '../ui/textarea'
import { KeyboardEvent } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

export const InputBox = () => {
  const { addMessage, inputPrompt, onInputChange, isGenerating, clearMessages, cancelGeneration } = useChatStore()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.shiftKey) {
        onInputChange(inputPrompt + '\n')
        return
      }
      addMessage()
    }
  }

  const handleClickSend = () => {
    if (isGenerating) {
      cancelGeneration()
    } else {
      addMessage()
    }
  }

  return (
    <div className="w-full border-t border-gray-200 bg-white p-4">
      <div className="flex items-end space-x-2">
        <Textarea
          rows={3}
          className="flex-1"
          placeholder="Imagine your next picture"
          onChange={(e) => onInputChange(e.target.value)}
          value={inputPrompt}
          onKeyDown={handleKeyPress}
        />
        <div className="flex flex-col gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant={'ghost'}>
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove all your generated images and prompts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearMessages}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button type="submit" size="icon" onClick={handleClickSend} disabled={!inputPrompt}>
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <SendIcon />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
