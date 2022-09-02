import tw from 'twin.macro'

export const styles = {
  card: [
    tw`flex flex-col gap-y-36`,
    tw`lg:(flex-row gap-x-[33px])`
  ],
  container: [
    tw`w-full mb-16 max-w-[368px] px-[18px] bg-white lg:(px-[28px] pb-[38px])`,
    tw`hover:shadow-primary flex flex-col rounded-[14px] mx-auto transition`
  ],
  image: tw`mb-4 -mt-12`,
  card_details: [
    tw`
      [> h4]:(text-lg font-semibold mb-2 lg:(mb-4 text-xl))
      [> p]:(line-clamp-4 text-gray-500)
    `
  ],
  card_footer: tw`flex items-center justify-between mt-8 mb-2 lg:(mb-0)`,
  ratings: tw`flex gap-x-2 text-red-400`,
  btn_start: tw`disabled:bg-opacity-50`
}
