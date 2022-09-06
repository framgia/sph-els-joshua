import tw from 'twin.macro'
import { NextRouter } from 'next/router'

type SideBarProps = {
  isOpen: boolean
}

type LinkProps = {
  href?: string
  router: NextRouter
}

export const styles = {
  sidebar: ({ isOpen }: SideBarProps) => [
    tw`fixed z-20 h-full top-0 left-0 pt-16 flex flex-shrink-0 flex-col bg-white`,
    isOpen ? tw`w-64` : tw`w-[68px]`
  ],
  section: tw`relative flex-1 flex flex-col min-h-0 border-r border-gray-200 pt-0`,
  main: tw`flex-1 flex flex-col pt-5 pb-4 overflow-y-auto`,
  nav: tw`flex-1 px-3 divide-y space-y-1`,
  ul: tw`space-y-2 pb-2`,
  a: ({ href, router }: LinkProps) => [
    tw`text-base font-semibold rounded-lg flex items-center p-2`,
    tw`hover:bg-gray-100 transition ease-in-out duration-150`,
    tw`focus:text-orange-500 focus:bg-gray-100 active:scale-95`,
    tw`hover:cursor-pointer`,
    router.pathname.includes(href!)
      ? tw`text-red-500` 
      : tw`group-hover:text-red-500 text-gray-600`
  ],
  btn_wrapper: tw`space-y-2 pt-2`
}
