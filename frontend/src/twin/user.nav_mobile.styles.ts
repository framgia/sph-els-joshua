import tw from 'twin.macro'
import { NextRouter } from 'next/router'

type UlProps = {
  isOpen: boolean
}

type AProps = {
  router: NextRouter
  href: string
}

export const styles = {
  btn_menu: tw`cursor-pointer text-4xl text-heading ml-[10px] lg:(hidden)`,
  ul: ({ isOpen }: UlProps) => [
    tw`flex flex-col absolute w-full top-[90px] left-0 bg-white rounded-md`,
    tw`shadow-primary space-y-6 overflow-hidden transition-all z-10`,
    isOpen ? tw`max-h-60 p-8` : tw`max-h-0 p-0`
  ],
  a: ({ router, href }: AProps) => [
    router.pathname.includes(href) && tw`text-red-500 font-bold`,
    tw`cursor-pointer`
  ]
}
