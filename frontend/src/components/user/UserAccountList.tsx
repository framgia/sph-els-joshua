import React from 'react'

import { IUser } from '~/data/interfaces'
import UserAccountItem from './UserAccountItem'

type Props = {
  users: IUser[]
}

const UserAccountList: React.FC<Props> = ({ users }): JSX.Element => {
  return (
    <ul className="mt-3 divide-y divide-gray-100">
      {users?.map((user) => <UserAccountItem key={user?.id} user={user} />)}
    </ul>
  )
}

export default UserAccountList
