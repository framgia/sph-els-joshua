import tw from 'twin.macro'

type WrapperProps = {
  isOpen: unknown
}

export const styles = {
  container: tw`flex overflow-hidden pt-16 bg-gray-100`,
  wrapper: ({ isOpen }: WrapperProps) => [
    tw`h-full w-full bg-gray-50 relative overflow-y-auto min-h-screen`,
    isOpen ? tw`ml-64` : tw`ml-16`
  ],
  main: tw`max-w-6xl mx-auto min-h-[80vh] p-5`
}
