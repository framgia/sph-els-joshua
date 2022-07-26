import { ImUsers } from 'react-icons/im'
import { GoChecklist } from 'react-icons/go'
import { GoListOrdered } from 'react-icons/go'

import { ISidebar } from './interfaces'

export const sidebarLinks: ISidebar[] = [
  {
    Icon: ImUsers,
    name: 'Users',
    href: '/admin/users'
  },
  {
    Icon: GoChecklist,
    name: 'Categories',
    href: '/admin/categories'
  },
  {
    Icon: GoListOrdered,
    name: 'Questions',
    href: '/admin/questions'
  }
]
