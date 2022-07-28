import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogOut } from 'react-icons/io5'

import { useAuth } from '~/hooks/auth'
import { ISidebar } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'
import { sidebarLinks } from '~/data/sidebarList'

type Props = {
  isOpen: Boolean
}

const Sidebar: React.FC<Props> = (props): JSX.Element => {
  const { isOpen } = props
  const router = useRouter()
  
  const { logout } = useAuth({
    middleware: 'auth'
  })  

  return (
    <aside className={classNames(
      'sidebar', isOpen ? 'w-64' : 'w-18'
    )}>
      <section className="sidebar-section">
        <main className="sidebar-main">
          <nav className="sidebar-nav">
            <ul className="sidebar-ul">
              {sidebarLinks?.map(({ Icon, name, href }: ISidebar, i: number) => (
                <li key={i}>
                  <Link href={href}>
                    <a
                      href="#"
                      className={classNames('group btn-sidebar-link',
                        router.pathname.includes(href)
                          ? 'text-orange-500 bg-gray-100'
                          : 'hover:text-orange-500 text-gray-600'
                      )}
                    >
                      <Icon
                        className={classNames(
                          'btn-sidebar-logo',
                          router.pathname.includes(href)
                            ? 'text-orange-500'
                            : 'group-hover:text-orange-500 text-gray-600'
                        )}
                      />
                      {isOpen && <span className="ml-3">{name}</span>}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                className={classNames(
                  'group btn-sidebar-link hover:text-orange-500',
                  'text-gray-600 w-full'
                )}
                onClick={logout}
              >
                <IoLogOut className={classNames(
                  'btn-sidebar-logo text-gray-500 group-hover:text-orange-500'
                )} />
                {isOpen && <span className="ml-4">Logout</span>}
              </button>
            </div>
          </nav>
        </main>
      </section>
    </aside>
  )
}

export default Sidebar
