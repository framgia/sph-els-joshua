import tw from 'twin.macro'

type TableProps = {
  loading: boolean
}

export const variants = {
  primary: [
    tw`text-white bg-red-500 hover:bg-red-600`,
    tw`focus:ring-red-400/50 focus:bg-red-500`,
    tw`disabled:hover:bg-red-500`
  ],
  secondary: tw`text-white bg-gray-500`,
  success: [
    tw`text-white bg-green-500 hover:bg-green-600`,
    tw`focus:ring-green-400/50 focus:bg-green-500`,
    tw`disabled:hover:bg-green-500`
  ],
  danger: tw`text-white bg-red-600`,
  warning: tw`text-white bg-yellow-400`,
  info: tw`text-white bg-blue-500`,
  light: tw`text-gray-700 bg-gray-200`,
  dark: tw`text-white bg-black`
}

export const styles = {
  form: tw`p-10 space-y-4`,
  form_title: tw`text-center font-extrabold text-lg text-gray-700`,
  label: tw`block mb-2 text-sm text-gray-600 font-medium`,
  form_control: [
    tw`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white`,
    tw`border border-gray-200 rounded-md focus:border-red-400 focus:ring-red-400`,
    tw`focus:outline-none focus:ring focus:ring-opacity-40 transition`,
    tw`ease-in-out duration-150 disabled:cursor-not-allowed disabled:opacity-60`,
  ],
  admin_main: tw`pt-4 px-4`,
  admin_section: tw`overflow-x-auto relative shadow-md sm:(rounded-lg)`,
  table: ({ loading }: TableProps) => [
    tw`
      w-full text-sm text-left text-gray-500 max-h-[40vh]
      [> thead]:(text-xs text-gray-700 uppercase bg-gray-50)
      [> thead > tr > th]:(py-3 px-6)
      [> tbody > tr]:(bg-white border-b hover:bg-gray-50)
      [> tbody > tr > td]:(py-4 px-6)
      [> tbody > tr > th]:(flex items-center py-4 px-6 text-gray-900 whitespace-nowrap)
    `,
    loading && tw`relative min-h-[40vh]`
  ]
}
