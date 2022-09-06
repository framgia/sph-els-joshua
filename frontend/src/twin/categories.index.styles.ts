import tw from 'twin.macro'

export const styles = {
  main: tw`w-full pt-5 space-x-4 overflow-hidden`,
  grid_wrapper: [
    tw`grid grid-cols-1 gap-4 py-16`,
    tw`md:(grid-cols-2) lg:(grid-cols-3)`
  ]
}
