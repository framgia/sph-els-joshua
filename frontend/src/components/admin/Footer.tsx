import React from 'react'

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="p-4 mx-5 md:px-6 md:py-8 dark:bg-gray-900">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2022. All Rights Reserved.</span>
   </footer>
  )
}

export default Footer
