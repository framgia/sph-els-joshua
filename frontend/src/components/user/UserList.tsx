import React from 'react'
import { KeyedMutator } from 'swr'

import UserItem from './../user/UserItem'
import { IProfile, IUser } from '~/data/interfaces'

type Props = {
  author: IUser
  users: IProfile[]
  mutate: KeyedMutator<any>
}

const UserList: React.FC<Props> = ({ users, author, mutate }): JSX.Element => (
  <>
    {users?.map((user: IProfile, i: number) => <UserItem key={i} user={user} author={author} mutate={mutate} index={i} />)}
  </>
)

export default UserList
