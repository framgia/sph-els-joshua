import React from 'react'
import Head from 'next/head'

import Header from '~/components/user/Header'
import Footer from '~/components/admin/Footer'
import { classNames } from '~/utils/classNames'

type Props = {
  children: React.ReactNode
  metaTitle: string
}

const Layout: React.FC<Props> = ({ children, metaTitle }) => {
  return (
    <>
      <Head>
        <title>ELearning | {metaTitle}</title>
      </Head>
      <Header />
      <main  className={classNames(
        'max-w-4xl mx-auto px-4 py-4 min-h-[70vh]'
      )}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
