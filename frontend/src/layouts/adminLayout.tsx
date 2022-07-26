import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useAuth } from '~/hooks/auth'

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const Layout: React.FC<Props> = (props) => {
  const { metaTitle, children } = props

  const router = useRouter()

  const { user: admin, logout } = useAuth({
    middleware: 'admin'
  })
  
  useEffect(() => {
    const isAuthenticatedAdmin = async () => {
      if (admin?.is_admin === 0) {
        await logout()
        return null
      }
      if (!admin) router.push('/admin')
    }
    isAuthenticatedAdmin()
  }, [admin])

  return (
    <>
      <Head>
        <title>Admin | {metaTitle}</title>
      </Head>
      <main>{children}</main>
    </>
  )
}

export default Layout
