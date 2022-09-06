import tw from 'twin.macro'
import Link from 'next/link'
import ReactAvatar from 'react-avatar'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import Nav from './Nav'
import NavMobile from './NavMobile'
import Avatar from '~/components/Avatar'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/helpers/classNames'
import { styles } from '~/twin/user.header.styles'

type Props = {
  user: IUser
  actions: {
    logout: () => void
  }
}

const Header: React.FC<Props> = ({ user, actions: { logout } }): JSX.Element => {
  const Logo = '/img/logo.png'
  return (
    <header css={styles.header}>
      <div css={styles.container}>
        <div css={styles.nav}>
          <Link href="/dashboard">
            <a>
              <img 
                src={Logo} 
                alt=""
              />
            </a>
          </Link>
          <div>
            <Nav />
          </div>
        </div>
        <div css={styles.toggle}>
          <MenuToggle user={user} logout={logout} />
          <NavMobile />
        </div>
      </div>
    </header>
  )
}

const MenuToggle = ({ user, logout }: { user: IUser, logout: () => void }) => {
  const router = useRouter()
  const subLink = [
    {
      name: 'Profile',
      href: `/profile/${user?.id}`
    },
    {
      name: 'Settings',
      href: '/settings'
    },
  ]

  const formatName = `${user?.name.split(' ').slice(0, -1).join(' ')} ${user?.name.split(' ').slice(-1).join(' ')[0]}.`

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button 
          type="button" 
          className={classNames(
            'flex flex-row-reverse items-center space-x-2',
            'hover:text-red-500'
          )}
        >
          <span className="sr-only">Open user menu</span>
          {user?.avatar_url === null ? (
            <ReactAvatar 
              name={user?.name} 
              size="32" 
              round="100%" 
            />
          ) : (
            <Avatar 
              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
              width={32}
              height={32}
            />
          )}
          {user && <p>{formatName}</p>}
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
          'bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
        )}>
          {subLink?.map(({ name, href }, i) => (
            <Menu.Item key={i}>
              <button
                onClick={() => router.push(href)}
                className={classNames(
                  'w-full text-left px-4 py-2 text-sm',
                  router.pathname.includes(href) ? 
                  'bg-red-500 text-white hover:text-white' : 
                  'hover:bg-red-100 text-red-900'
                )}
              >
                {name}
              </button>
            </Menu.Item>
          ))}
          <Menu.Item>
            <a
              href="#"
              onClick={logout}
              className="w-full hover:bg-red-100 block px-4 py-2 text-sm text-red-900">
              Sign Out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Header
