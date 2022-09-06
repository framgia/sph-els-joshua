import tw from 'twin.macro'

export const styles = {
  footer: [
    tw`
      p-4 mx-5 md:(px-6 py-8)
      [> hr]:my-6 border-gray-200 sm:(mx-auto) lg:(my-8)
      [> span]:block text-sm text-gray-400 text-center
    `
  ]
}
