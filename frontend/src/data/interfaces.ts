import { IconType } from 'react-icons'

export interface ISidebar {
  Icon: IconType
  name: string
  href: string
}

export interface IUser {
  id: number
  name: string
  avatar_url?: string
  email: string
  password?: string
  is_admin: boolean
  created_at?: string
  updated_at?: string
}
