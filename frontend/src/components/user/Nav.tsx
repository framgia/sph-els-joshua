import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'

const Nav: React.FC = (): JSX.Element => {
  const router = useRouter()

  return (
    <nav className='ml-[70px]'>
      <ul className='flex gap-x-[42px]'>
        {headerLinks.map(({ name, href }: IHeaderLink, i: number) => (
          <li key={i}>
            <Link href={href}>
              <a className={router.pathname.includes(href) ? 'text-red-500 font-bold' : ''}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
