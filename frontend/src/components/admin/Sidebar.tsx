import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogOut } from 'react-icons/io5'

import { useAuth } from '~/hooks/auth'
import { ISidebar } from '~/data/interfaces'
import { classNames } from '~/helpers/classNames'
import { sidebarLinks } from '~/data/sidebarList'
import { styles } from '~/twin/admin.sidebar.styles'

type Props = {
  isOpen: any
}

const Sidebar: React.FC<Props> = (props): JSX.Element => {
  const { isOpen } = props
  const router = useRouter()
  
  const { logout } = useAuth({
    middleware: 'auth'
  })  

  return (
    <aside css={styles.sidebar({ isOpen })}>
      <section css={styles.section}>
        <main css={styles.main}>
          <nav css={styles.nav}>
            <ul css={styles.ul}>
              {sidebarLinks?.map(({ Icon, name, href }: ISidebar, i: number) => (
                <li key={i}>
                  <Link href={href}>
                    <a
                      className="group"
                      css={styles.a({ href, router })}
                    >
                      <Icon
                        className={classNames(
                          'btn-sidebar-logo',
                          router.pathname.includes(href)
                            ? 'text-red-500'
                            : 'group-hover:text-red-500 text-gray-600'
                        )}
                      />
                      {isOpen && <span css={tw`ml-3`}>{name}</span>}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div css={styles.btn_wrapper}>
              <button
                type="button"
                className="group w-full hover:text-red-500"
                css={styles.a({ router })}
                onClick={logout}
              >
                <IoLogOut className={classNames(
                  'btn-sidebar-logo text-gray-500',
                  'group-hover:text-red-500'
                )} />
                {isOpen && <span css={tw`ml-4`}>Logout</span>}
              </button>
            </div>
          </nav>
        </main>
      </section>
    </aside>
  )
}

export default Sidebar
