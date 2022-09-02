import tw from 'twin.macro'

export const styles = {
  wrapper: tw`bg-white flex justify-center h-screen`,
  banner: [
    tw`relative hidden bg-cover lg:(block w-2/3)`,
    tw`background-image[url('/img/2.jpg')]`
  ],
  banner_filter: tw`absolute bg-black/10 inset-0`,
  banner_text: [
    tw`
      flex items-center h-screen px-20
      [> div]:space-y-2
      [> div > h2]:text-5xl font-semibold text-white
      [> div p]:text-lg
    `
  ],
  auth_form: [
    tw`
      flex items-center w-full max-w-md px-6 mx-auto lg:(w-2/6)
      [> div]:flex-1
    `
  ],
  auth_form_h2: tw`text-4xl font-bold text-center text-gray-700`,
  auth_form_p: tw`mt-3 text-gray-500`
}
