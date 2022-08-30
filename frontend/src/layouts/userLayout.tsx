import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

import { useAuth } from '~/hooks/auth'
import Header from '~/components/user/Header'
import Footer from '~/components/admin/Footer'
import { classNames } from '~/utils/classNames'

type Props = {
  children: ReactNode
  metaTitle: string
}

const Layout: React.FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const { user, logout } = useAuth({
    middleware: 'auth'
  })

  return (
    <>
      <Head>
        <title key="title">{`ELearning | ${metaTitle}`}</title>
      </Head>
      {!router.pathname.includes('/categories/questions') && <Header user={user} actions={{ logout }} />}
      <main  className={classNames(
        'max-w-6xl mx-auto px-4 py-4 min-h-[70vh]'
      )}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
