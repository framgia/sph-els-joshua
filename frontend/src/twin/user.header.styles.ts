import tw from 'twin.macro'

export const styles = {
  header: tw`bg-white py-5 px-5 shadow-primary transition-all duration-500`,
  container: tw`flex items-center justify-between max-w-6xl mx-auto`,
  nav: [
    tw`
      flex items-center
      [> div]:(hidden lg:(flex))
      [> a > img]:(h-6)
    `
  ],
  toggle: tw`flex items-center`
}
