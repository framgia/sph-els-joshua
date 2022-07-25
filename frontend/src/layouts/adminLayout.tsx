import React, { useEffect } from 'react'
import Head from 'next/head'
import { useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'

interface Props {
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
    <React.Fragment>
      <Head>
        <title>Admin | {metaTitle}</title>
      </Head>
      <main>{children}</main>
    </React.Fragment>
  )
}

export default Layout