import tw from 'twin.macro'

export const styles = {
  caption: tw`p-5 text-lg text-left text-gray-900 bg-white`,
  wrapper: tw`flex items-center justify-between`,
  title: [
    tw`
      [> h1]:(font-semibold)
      [> p]:(mt-1 text-sm font-normal text-gray-500)
    `
  ],
  field_wrapper: [
    tw`
      mt-1 flex items-center space-x-4
      [> div]:(relative lg:(w-64))
      [> div > div]:(absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none)
      [> div > input]:(pl-10 mt-0)
    `
  ]
}
