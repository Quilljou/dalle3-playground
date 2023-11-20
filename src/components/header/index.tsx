import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Github } from 'lucide-react'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const { t } = useTranslation('translation')

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-4">
      <a href="/" className="text-xs md:text-base">
        DALL·E 3 Playground
      </a>
      <div className="flex items-center gap-4">
        {/* <LanguageSelector /> */}
        <Button size={'icon'} asChild variant={'ghost'}>
          <a href="https://github.com/Quilljou/dalle3-playground" target="_blank" rel="noreferrer">
            <Github />
          </a>
        </Button>
      </div>
    </div>
  )
}
