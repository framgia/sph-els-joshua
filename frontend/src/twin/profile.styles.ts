import tw from 'twin.macro'

export const styles = {
  main: [
    tw`flex flex-col space-y-4 overflow-hidden pt-5`,
    tw`md:(flex-row space-y-0 space-x-4)`
  ],
  section: tw`w-full overflow-hidden shadow-primary rounded-lg bg-white`,
  card_title: tw`
    py-4 px-6 border-b
    [> h1]:(font-bold)
  `,
  card_content: [
    tw`pt-2 pb-4 px-6 divide-y space-y-2`,
    tw`max-h-[50vh] overflow-y-auto`
  ]
}
