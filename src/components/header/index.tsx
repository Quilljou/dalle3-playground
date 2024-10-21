import React, { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Github, MenuIcon, TwitterIcon } from 'lucide-react'
import { useChatStore } from 'src/stores/chat'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const { toggleSettingFormSheet } = useChatStore()

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-4">
      <a href="/" className="font-bold md:text-lg">
        DALL·E Playground
      </a>
      <div className="flex items-center gap-2">
        {/* <LanguageSelector /> */}
        <Button size={'icon'} asChild variant={'ghost'}>
          <a href="https://twitter.com/quillzhou" target="_blank" rel="noreferrer">
            <TwitterIcon />
          </a>
        </Button>
        <Button size={'icon'} asChild variant={'ghost'}>
          <a href="https://github.com/Quilljou/dalle3-playground" target="_blank" rel="noreferrer">
            <Github />
          </a>
        </Button>
        <Button
          size={'icon'}
          variant={'ghost'}
          className="md:hidden"
          onClick={() => {
            toggleSettingFormSheet(true)
          }}
        >
          <MenuIcon></MenuIcon>
        </Button>
      </div>
    </div>
  )
}
