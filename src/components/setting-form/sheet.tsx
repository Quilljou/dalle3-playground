import { useChatStore } from 'src/stores/chat'
import { SettingForm } from '.'
import { Sheet, SheetContent } from '../../components/ui/sheet'

export function SettingFormSheet() {
  const { isShowingSettingFormSheet, toggleSettingFormSheet } = useChatStore()
  return (
    <Sheet open={isShowingSettingFormSheet} onOpenChange={toggleSettingFormSheet}>
      <SheetContent side={'top'}>
        <SettingForm />
      </SheetContent>
    </Sheet>
  )
}
