import tw from 'twin.macro'

type Props = {
  is_correct: boolean
}

export const styles = {
  result_title: [
    tw`
      flex items-center justify-between px-5 py-3 rounded-md bg-white
      [> div]:text-xl font-bold text-red-500
      [> h1]:text-lg
    `
  ],
  result_content: [
    tw`
      mt-2 py-3 bg-white p-5 rounded-md shadow-primary
      [> div > div]:(flex flex-col space-y-2 divide-y w-full)
    `
  ],
  result_lessons: tw`flex flex-col space-y-2 py-2`,
  result_question_wrapper: tw`
    flex items-center space-x-2
    [> label]:(text-lg font-semibold)
  `,
  result_status: ({ is_correct }: Props) => [
    tw`flex items-center px-1 py-0.5`,
    tw`rounded-full space-x-1 text-white`,
    is_correct ? tw`bg-green-500` : tw`bg-red-500`
  ],
  p: [
    tw`
      pl-4 text-sm text-gray-500 flex space-x-2
      [> span]:(text-xs bg-purple-500 py-0.5 px-1 rounded-full text-white)
    `
  ]
}
