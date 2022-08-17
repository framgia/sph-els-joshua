import { IconType } from 'react-icons'

export interface ISidebar {
  Icon: IconType
  name: string
  href: string
}

export interface IUser extends IUserRelationship {
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
  lessons?: ILesson[]
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

export interface IHeaderLink {
  name: string
  href: string
}

export interface IFollow {
  id?: number
  follower_id: number
  following_id: number
}

export interface IUserRelationship extends IFollow {
  followers?: IFollower[]
  following?: IFollowing[]
}

export interface IFollower {
  id: number
  follower_id: number
}

export interface IFollowing {
  id: number
  following_id: number
}

export interface ICategoryQuestion extends IQuestion {
  choices: IChoice[]
}

export interface ILesson {
  id: number
  user_id: number
  category_id: number
  created_at?: string
  answers: IAnswer[]
}

export interface IAnswer {
  id: number
  lesson_id: number
  choice_id: number
  is_correct: boolean
  question: IQuestion
}

export interface IActivity {
  user_id: number
  activity_id: number
  activity_type: string
  created_at: string
}

export interface ILessonAndFollow {
  following_user?: IUser
  lessons?: ILesson
  created_at?: string
}
