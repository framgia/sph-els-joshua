import tw from 'twin.macro'

export const styles = {
  wrapper: tw`mt-6 flex flex-col overflow-hidden md:(flex-row space-x-4)`,
  avatar_container: tw`mt-2 w-full min-h-[20vh] md:(w-1/2)`,
  avatar_wrapper: tw`flex flex-col items-center pb-3`,
  avatar: tw`inline-flex rounded-full shadow-lg`,
  avatar_form: tw`flex flex-col`,
  input_file: tw`mt-3 text-xs rounded-md bg-gray-100`,
  btn_upload: tw`mt-4 rounded-md py-1.5 cursor-pointer flex justify-center`,
  card: tw`text-xl font-bold text-gray-900`,
  title: tw`mt-2 bg-white rounded-lg shadow-primary border-gray-200 p-6`
}
