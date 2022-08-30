import Link from 'next/link'
import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { useRouter } from 'next/router'

import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'
import { classNames } from '~/helpers/classNames'

const NavMobile: React.FC = (): JSX.Element => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer text-4xl text-heading ml-[10px] lg:hidden'
      >
        <BiMenu />
      </div>
      <ul
        className={classNames(
          isOpen ? 'max-h-60 p-8' : 'max-h-0 p-0',
          'flex flex-col absolute w-full top-[90px] left-0 bg-white rounded-md',
          'shadow-primary space-y-6 overflow-hidden transition-all z-10'
        )}
      >
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

export default NavMobile
