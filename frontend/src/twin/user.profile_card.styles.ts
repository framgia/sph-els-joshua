import tw from 'twin.macro'

export const styles = {
  wrapper: tw`w-full min-h-[20vh] md:(w-1/2)`,
  container: [
    tw`flex flex-col items-center pb-3 w-full bg-white `,
    tw`shadow-primary rounded-lg py-6  md:(max-w-sm)`
  ],
  avatar: tw`inline-flex rounded-full shadow-lg`,
  name: tw`mt-3 text-xl font-medium text-gray-900 pb-3`,
  follow_wrapper: [
    tw`
      flex items-center space-x-8 border-t pt-4
      [> div]:(flex items-center flex-col space-y-2)
      [> div > p]:(text-xs font-bold)
      [> div > a]:(text-xs text-black font-medium)
    `
  ],
  btn_follow_wrapper: [
    tw`
      flex flex-col py-5
      [> button]:(rounded-full px-12 py-1)
    `
  ]
}
