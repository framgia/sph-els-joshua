import tw from 'twin.macro'

type Props = {
  active: boolean
}

export const styles = {
  header: tw`bg-white border-b border-gray-200 fixed z-30 w-full`,
  main: tw`flex items-center justify-between px-3 py-3 lg:px-5 lg:pl-3`,
  section: tw`
    flex items-center
    [> a]:text-xl font-bold ml-1.5 lg:(ml-2.5)
    [> a > h1]:self-center whitespace-nowrap
    [> a > h1 > span]:text-transparent bg-clip-text bg-gradient-to-r
      from-purple-500 to-pink-600
  `,
  btn_menu: [
    tw`mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 rounded`,
    tw`hover:bg-gray-100 focus:bg-gray-100 focus:ring-gray-100`,
    tw`active:scale-95 transition ease-in-out duration-150`
  ],
  btn_menu_logout: ({ active }: Props) => [
    active ? tw`bg-red-500 text-white` : tw`text-gray-500`
  ]
}
