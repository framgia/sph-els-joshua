import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { IoClose } from 'react-icons/io5'
import { BiMenuAltRight  } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'

import Avatar from '~/components/Avatar'
import { classNames } from '~/utils/classNames'
import { headerLinks } from '~/data/headerLinks'
import { IHeaderLink, IUser } from '~/data/interfaces'

type Props = {
  user: IUser
  actions: {
    logout: () => void
  }
}

const Header: React.FC<Props> = ({ user, actions: { logout } }): JSX.Element => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={classNames(
      'bg-white border-b shadow-sm',
      router.pathname.includes('/categories/questions') ?
      'cursor-not-allowed opacity-50' : ''
    )}>
      <nav className={classNames(
        'max-w-4xl mx-auto px-4 py-4 flex-wrap',
        'flex items-center justify-between'
      )}>
        <div>
          <h1 className={classNames(
            'font-semibold text-lg text-gray-900'
          )}>Sun<span className="text-orange-500">*</span> ELearning App</h1>
        </div>
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full hover:bg-orange-50 focus:bg-orange-100"
          >
            <BiMenuAltRight className="w-7 h-7 fill-current" />
          </button>
          <DropDownMenuToggle 
            isOpen={isOpen} 
            logout={logout} 
            setIsOpen={setIsOpen} 
          />
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-4">
            {headerLinks?.map(({ name, href }: IHeaderLink, i: number) => (
              <li key={i}>
                {router.pathname.includes('/categories/questions') ? (
                  <span className={classNames(
                    'font-medium text-sm',
                    router.pathname.includes(href) ? 
                    'text-orange-500 font-bold' : ''
                  )}>{name}</span>
                ) : (
                  <Link href={href}>
                    <a className={classNames(
                      'font-medium text-sm hover:text-orange-500',
                      router.pathname.includes(href) ? 
                      'text-orange-500 font-bold' : ''
                    )}>{name}</a>
                  </Link>
                )}
              </li>
            ))}
            <MenuToggle user={user} logout={logout} />
          </ul>
        </div>
      </nav>
    </header>
  )
}

function DropDownMenuToggle({ isOpen, setIsOpen, logout }: { isOpen: boolean, setIsOpen: Function, logout: () => void }) {
  const router = useRouter()
  const subLink = [
    {
      name: 'Profile',
      href: '/profile'
    },
    {
      name: 'Settings',
      href: '/settings'
    },
  ]

  return (
    <Transition show={isOpen}>
      <nav className="absolute top-0 inset-x-0 p-2 z-50">
        <div className="shadow-lg rounded-lg border-t border-gray-100">
          <div className="bg-white shadow-sm rounded-lg pt-5 pb-8 px-5 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className={classNames(
                'font-semibold text-lg text-gray-900'
              )}>Sun<span className="text-orange-500">*</span> ELearning App</h1>
              <div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1.5 rounded-full hover:bg-orange-50 focus:bg-orange-100"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
            </div>
            <nav className="border-t border-gray-100 pt-3">
              <ul className="flex flex-col space-x-0 space-y-3">
                {headerLinks?.map(({ name, href }: IHeaderLink, i: number) => (
                  <li key={i}>
                    {router.pathname.includes('/categories/questions') ? (
                      <span className={classNames(
                        'font-medium text-sm',
                        router.pathname.includes(href) ? 
                        'text-orange-500 font-bold' : ''
                      )}>{name}</span>
                    ) : (
                      <Link href={href}>
                        <a className={classNames(
                          'font-medium text-sm hover:text-orange-500',
                          router.pathname.includes(href) ? 
                          'text-orange-500 font-bold' : ''
                        )}>{name}</a>
                      </Link>
                    )}
                  </li>
                ))}
                {router.pathname.includes('/categories/questions') ? (
                  <span className="text-left text-sm font-medium">
                    Logout
                  </span>
                ) : (
                  <>
                    {subLink?.map(({ name, href }, i) => (
                      <Link 
                        key={i}
                        href={href}
                      >
                        <a
                          className="text-left text-sm font-medium hover:text-orange-500"
                        >
                          {name}
                        </a>
                      </Link>
                    ))}
                    <button
                      type="button"
                      className="text-left text-sm font-medium hover:text-orange-500"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </Transition>
  )
}

function MenuToggle({ user, logout }: { user: IUser, logout: () => void }) {
  const subLink = [
    {
      name: 'Profile',
      href: '/profile'
    },
    {
      name: 'Settings',
      href: '/settings'
    },
  ]

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button type="button" className="flex items-center">
          <span className="sr-only">Open user menu</span>
          <Avatar 
            url={`${user?.avatar_url === null ? 'https://i.stack.imgur.com/l60Hf.png' : user?.avatar_url}`}
            width={25}
            height={25}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className={classNames(
          'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1',
          'bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
        )}>
          {subLink?.map(({ name, href }, i) => (
            <Menu.Item key={i}>
              <Link href={href}>
                <a className="hover:bg-orange-100 block px-4 py-2 text-sm text-orange-900">
                  {name}
                </a>
              </Link>
            </Menu.Item>
          ))}
          <Menu.Item>
            <a
              href="#"
              onClick={logout}
              className="w-full hover:bg-orange-100 block px-4 py-2 text-sm text-orange-900">
              Sign Out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Header
