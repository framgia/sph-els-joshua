import tw from 'twin.macro'

export const styles = {
  ul: tw`mt-3 divide-y divide-gray-100`,
  li: [
    tw`hover:bg-red-50 px-4 py-2 flex items-center`,
    tw`justify-between bg-white rounded-xl my-1`
  ],
  list_wrapper: [
    tw`w-full flex items-center py-1.5 space-x-4`,
    tw`
      transition ease-in-out duration-150 rounded
      [> a]:text-gray-900 flex flex-row items-center space-x-2
    `
  ],
  user_details_wrapper: tw`flex flex-col`,
  link_name: [
    tw`text-sm font-bold capitalize text-gray-700`,
    tw`hover:underline focus:outline-none hover:text-red-600`,
    tw`transition ease-in-out duration-150`
  ],
  h1: [
    tw`text-xs font-medium text-left`,
    tw`text-gray-600 lowercase`
  ],
  follow: [
    tw`rounded-full px-5 py-1 font-semibold text-xs`
  ]
}
