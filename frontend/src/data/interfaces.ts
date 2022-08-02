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

export interface ICategory {
  id: number
  title: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface IThead {
  name: string
}

export interface IChoice {
  id: string
  value: string
}

export interface IQuestion {
  id?: number
  category_id: number
  choice_id: number
  value: string
}
