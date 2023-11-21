import { Helmet } from 'react-helmet'
import { MessageList } from 'src/components/messages'
import { SettingForm } from 'src/components/setting-form'
import { InputBox } from 'src/components/input-box'
import { Header } from 'src/components/header'
import { APIKeyDialog } from 'src/components/api-key-dialog'
import { SettingFormSheet } from 'src/components/setting-form/sheet'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DALL·E 3 Playground</title>
      </Helmet>
      <div className="flex h-full flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            <MessageList></MessageList>
            <InputBox />
          </div>
          <div className="box-border hidden h-full w-[260px] border-l border-gray-200 p-4 md:block">
            <SettingForm></SettingForm>
          </div>
        </div>
      </div>
      <APIKeyDialog />
      <SettingFormSheet />
    </>
  )
}
