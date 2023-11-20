import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { MessageList } from 'src/components/messages'
import { SettingForm } from 'src/components/setting-form'
import { InputBox } from 'src/components/input-box'
import { Header } from 'src/components/header'

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
          <div className="h-full flex-1 overflow-y-auto pb-[100px]">
            <MessageList></MessageList>
          </div>
          <div className="box-border h-full w-[260px] border-l border-gray-200 p-4">
            <SettingForm></SettingForm>
          </div>
        </div>
        <InputBox />
      </div>
    </>
  )
}
