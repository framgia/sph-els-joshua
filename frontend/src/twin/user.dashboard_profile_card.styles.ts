import tw from 'twin.macro'

export const styles = {
  wrapper: tw`w-full md:w-1/2 flex flex-col justify-start`,
  title: tw`ml-6 font-semibold`,
  container: tw`flex items-center`,
  avatar: [
    tw`
      flex-shrink-0
      [> a]:(text-gray-700 flex flex-row items-center space-x-1)
    `
  ],
  user_wrapper: tw`w-full flex flex-col space-y-2`,
  user_name: [
    tw`
      flex flex-row justify-between
      [> a]:(ml-3 font-semibold text-gray-900 text-base)
    `
  ],
  user_lessons: [
    tw`
      ml-3 space-y-1
      [> a]:(text-red-500 text-xs)
    `
  ]
}
