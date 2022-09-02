import React from 'react'
import Head from 'next/head'
import createPersistedState from 'use-persisted-state'

import { useAuth } from '~/hooks/auth'
import Header from '~/components/admin/Header'
import Footer from '~/components/admin/Footer'
import Sidebar from '~/components/admin/Sidebar'
import { styles } from '~/twin/admin.layout.styles'

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const Layout: React.FC<Props> = (props) => {
  const { metaTitle, children } = props

  const useToggleState = createPersistedState('toggle')
  const [isOpen, setIsOpen] = useToggleState(true)

  const { user: admin, logout } = useAuth({
    middleware: 'admin'
  })

  const handleOpen = (): void => setIsOpen((prev: boolean) => prev = !prev)

  return (
    <>
      <Head>
        <title>Admin | {metaTitle}</title>
      </Head>
      {/* Admin Header */}
      <Header 
        admin={admin} 
        actions={{ handleOpen, logout }} 
      />
      <div css={styles.container}>
        {/* Admin Sidebar */}
        <Sidebar isOpen={isOpen} />
        {/* Main Content */}
        <div css={styles.wrapper({ isOpen })}>
          <main css={styles.main}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
