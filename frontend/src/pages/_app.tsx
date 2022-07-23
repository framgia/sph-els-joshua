import React from 'react'
import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { Slide, ToastContainer } from 'react-toastify'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
