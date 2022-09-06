import Aos from 'aos'
import Head from 'next/head'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Slide, ToastContainer } from 'react-toastify'

import '~/styles/globals.css'
import NextProgress from '~/lib/next-progress'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    Aos.init({
      duration: 200,
      offset: 100
    })
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextProgress />
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
    </>
  )
}

export default MyApp
