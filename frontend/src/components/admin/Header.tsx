import tw from 'twin.macro'
import Link from 'next/link'
import ReactAvatar from 'react-avatar'
import React, { Fragment } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { HiMenuAlt4 } from 'react-icons/hi'
import { BiCaretDown } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/helpers/classNames'
import { styles } from '~/twin/admin.header.styles'

type Props = {
  admin: IUser
  actions: { 
    logout: () => void
    handleOpen: () => void 
  }
}

const Header: React.FC<Props> = ({ admin, actions }): JSX.Element => {
  const { handleOpen, logout } = actions

  return (
    <header css={styles.header}>
      <main css={styles.main}>
        <section css={styles.section}>
          <button
            type="button"
            onClick={handleOpen}
            css={styles.btn_menu}
          >
            <HiMenuAlt4 css={tw`w-6 h-6`} />
          </button>
          <Link href="/admin/users">
            <a>
              <h1>
                <span>ELearning</span> Admin
              </h1>
            </a>
          </Link>
        </section>
        <section css={styles.section}>
          <Menu as="div" className="header-menu">
            {({ open }) => (
              <>
                <Menu.Button
                  type="button"
                  className="header-menu-button"
                >
                  {!admin?.avatar_url ? (
                    <ReactAvatar 
                      name={admin?.name} 
                      size="32" 
                      round="100%" 
                    />
                  ) : (
                    <Avatar 
                      url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${admin?.avatar_url}`}
                      width={32}
                      height={32}
                    />
                  )}
                  {admin && <span css={tw`text-sm font-medium`}>{admin?.name}</span>}
                  <BiCaretDown 
                    className={classNames(
                      'w-4 h-4', 
                      open ? 'rotate-180' : 'rotate-0'
                    )} 
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="header-menu-items">
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className="group header-menu-item"
                            css={styles.btn_menu_logout({ active })}
                          >
                            <IoLogOut css={tw`mr-2 h-5 w-5`} />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </section>
      </main>
    </header>
  )
}

export default Header
