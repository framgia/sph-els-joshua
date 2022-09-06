import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'

type StyleProps = {
 router: NextRouter
 href: string
}

const styles = {
  nav: [
    tw`
      ml-[70px]
      [> ul]:(flex gap-x-[42px])
    `
  ],
  a: ({ router, href }: StyleProps) => [
    router.pathname.includes(href) && tw`text-red-500 font-bold`,
    tw`cursor-pointer`
  ]
}

const Nav: React.FC = (): JSX.Element => {
  const router = useRouter()
  
  return (
    <nav css={styles.nav}>
      <ul>
        {headerLinks.map(({ name, href }: IHeaderLink, i: number) => (
          <li key={i}>
            <Link href={href}>
              <a css={styles.a({ router, href })}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
