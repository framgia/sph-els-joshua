import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { classNames } from '~/utils/classNames'
import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'

const Header = (): JSX.Element => {
  const router = useRouter()

  return (
    <header className="bg-white border-b shadow-sm">
      <nav className={classNames(
        'max-w-4xl mx-auto px-4 py-4',
        'flex items-center justify-between'
      )}>
        <div>
          <h1 className={classNames(
            'font-semibold text-lg text-gray-900'
          )}>Sun<span className="text-orange-500">*</span> ELearning App</h1>
        </div>
        <ul className="flex items-centers space-x-4">
          {headerLinks?.map(({ name, href }: IHeaderLink, i: number) => (
            <li key={i}>
              <Link href={href}>
                <a className={classNames(
                  'font-medium text-sm hover:text-orange-500',
                  router.pathname.includes(href) ? 
                  'text-orange-500 font-bold' : ''
                )}>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
