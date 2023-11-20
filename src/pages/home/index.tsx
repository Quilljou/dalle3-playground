import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { MessageList } from 'src/components/messages'
import { SettingForm } from 'src/components/setting-form'
import { InputBox } from 'src/components/input-box'
import { Header } from 'src/components/header'
import { APIKeyDialog } from 'src/components/api-key-dialog'
import { SettingFormSheet } from 'src/components/setting-form/sheet'

export default function Home() {
  const { t } = useTranslation('translation')

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <MessageList></MessageList>
          <div className="box-border hidden h-full w-[260px] border-l border-gray-200 p-4 md:block">
            <SettingForm></SettingForm>
          </div>
        </div>
        <InputBox />
      </div>
      <APIKeyDialog />
      <SettingFormSheet />
    </>
  )
}
