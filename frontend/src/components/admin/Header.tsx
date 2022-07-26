import Link from 'next/link'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { HiMenuAlt4 } from 'react-icons/hi'
import { IoSettings } from 'react-icons/io5'
import { BiCaretDown } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'

import { IUser } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'

interface Props {
  admin: IUser
  actions: { 
    logout: () => void
    handleOpen: () => void 
  }
}

const Header: React.FC<Props> = (props): JSX.Element => {
  const { admin, actions } = props
  const { handleOpen, logout } = actions

  return (
    <header className="header">
      <main className="header-main">
        <section className="header-section">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-menu"
          >
            <HiMenuAlt4 className="w-6 h-6" />
          </button>
          <Link href="/admin/users">
            <a className="text-xl font-bold flex items-center ml-1.5 lg:ml-2.5">
              <h1 className="self-center whitespace-nowrap">
                <span className="header-title">ELearning</span> Admin
              </h1>
            </a>
          </Link>
        </section>
        <section className="header-section">
          <Menu as="div" className="header-menu">
            {({ open }) => (
              <React.Fragment>
                <div>
                  <Menu.Button
                    type="button"
                    className="header-menu-button"
                  >
                    <Avatar url="https://i.pravatar.cc/60" />
                    {open ? <span className="text-sm font-medium">{admin?.name}</span> : <span className="text-sm font-medium">{admin?.name}</span>}
                    <BiCaretDown className="w-4 h-4" />
                  </Menu.Button>
                </div>
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
                            className={classNames(
                              'group header-menu-item',
                              active ? 'bg-orange-500 text-white' : 'text-gray-500'
                            )}
                          >
                            <IoSettings className="mr-2 h-5 w-5" />
                            Settings
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={classNames(
                              'group header-menu-item',
                              active ? 'bg-orange-500 text-white' : 'text-gray-500'
                            )}
                          >
                            <IoLogOut className="mr-2 h-5 w-5" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </React.Fragment>
            )}
          </Menu>
        </section>
      </main>
    </header>
  )
}

function Avatar ({ url }: { url: string }) {
  return (
    <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
      <div className="bg-white p-0.5 rounded-full flex flex-shrink-0 overflow-hidden">
        <Image 
          width={35}
          height={35}
          src={url}
          objectFit="cover"
          alt="avatar" 
          layout="intrinsic"
        />
      </div>
    </div>
  )
}

export default Header