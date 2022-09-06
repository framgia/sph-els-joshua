import Link from 'next/link'
import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { useRouter } from 'next/router'

import { IHeaderLink } from '~/data/interfaces'
import { headerLinks } from '~/data/headerLinks'
import { styles } from '~/twin/user.nav_mobile.styles'

const NavMobile: React.FC = (): JSX.Element => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      <div
        onClick={() => setIsOpen(!isOpen)}
        css={styles.btn_menu}
      >
        <BiMenu />
      </div>
      <ul css={styles.ul({ isOpen })}>
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

export default NavMobile
