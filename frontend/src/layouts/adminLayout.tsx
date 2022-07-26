import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useAuth } from '~/hooks/auth'
import Header from '~/components/admin/Header'
import Footer from '~/components/admin/Footer'
import { classNames } from '~/utils/classNames'
import Sidebar from '~/components/admin/Sidebar'

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const Layout: React.FC<Props> = (props) => {
  const { metaTitle, children } = props
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const router = useRouter()

  const { user: admin, logout } = useAuth({
    middleware: 'admin'
  })

  const handleOpen = (): void => setIsOpen(prev => prev = !prev)
  
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

  if (!admin) return null

  return (
    <>
      <Head>
        <title>Admin | {metaTitle}</title>
      </Head>
      {/* Admin Header */}
      <Header admin={admin} actions={{ handleOpen, logout }} />
      <div className="flex overflow-hidden pt-16 bg-gray-100">
        {/* Admin Sidebar */}
        <Sidebar isOpen={isOpen} />
        {/* Main Content */}
        <div className={classNames(
          'h-full w-full bg-gray-50 relative overflow-y-auto min-h-screen',
          isOpen ? 'ml-64' : 'ml-16'
        )}>
          <main className="max-w-6xl mx-auto min-h-[80vh] p-5">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
