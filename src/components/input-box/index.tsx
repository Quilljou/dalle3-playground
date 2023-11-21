import { Button } from '../ui/button'
import { Loader2, SendIcon } from 'lucide-react'
import { useChatStore } from 'src/stores/chat'
import { Textarea } from '../ui/textarea'
import { KeyboardEvent } from 'react'

export const InputBox = () => {
  const { addMessage, inputPrompt, onInputChange, isGenerating } = useChatStore()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
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
        <Button type="submit" size="icon" onClick={() => addMessage()} disabled={!inputPrompt}>
          {isGenerating ? <Loader2 className="animate-spin" /> : <SendIcon />}
        </Button>
      </div>
    </div>
  )
}
