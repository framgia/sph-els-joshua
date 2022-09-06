import tw from 'twin.macro'

export const styles = {
  category_title: [
    tw`
      pt-5 pb-4 bg-white rounded-md shadow-primary
      [> h1]:(text-2xl font-bold text-red-500 text-center)
    `
  ],
  question_form: [
    tw`
      mt-4 bg-white px-8 py-4 rounded-md shadow-primary
      [> div]:(divide-y divide-gray-100)
    `
  ],
  question_wrapper: [
    tw`
      flex flex-col pb-10 pt-4
      [> div]:(flex items-start flex-col md:(flex-row))
      [> div > div]:(flex flex-col md:(w-1/2))
      [> div > div > label]:(text-lg font-semibold)
    `
  ],
  choices_container: tw`mt-3 md:mt-0 md:w-1/2 space-y-4`,
  choices_wrapper: [
    tw`
      flex space-x-2 items-center
      [> span]:(font-medium)
      [> div]:(flex items-center)
      [> div > label]:(ml-2 text-sm font-medium)
    `
  ],
  btn_wrapper: [
    tw`pt-4 flex justify-end`
  ]
}
