import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { classNames } from '~/utils/classNames'
import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'

type Props = {
  actions: {
    logout: () => void
  }
}

const Header: React.FC<Props> = ({ actions: { logout } }): JSX.Element => {
  const router = useRouter()

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
           {router.pathname.includes('/categories/questions') ? (
            <span className="text-sm font-medium">
              Logout
            </span>
           ) : (
           
            <button
              type="button"
              className="text-sm font-medium hover:text-orange-500"
              onClick={(logout)}
            >
              Logout
            </button>
           )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
