import React, { useState } from 'react'

import Caption from './Caption'
import UserItem from './UserItem'
import TableHead from './Tablehead'
import { Spinner } from '~/utils/Spinner'
import { IThead, IUser } from '~/data/interfaces'

type Props = {
  users: IUser[]
  loading: boolean
}

const UserList: React.FC<Props> = (props): JSX.Element => {
  const { users, loading } = props
  const [searchedVal, setSearchedVal] = useState<string>('')
  const tHeads: IThead[] = [
    {
      name: 'ID'
    },
    {
      name: 'Name'
    },
    {
      name: 'Role'
    },
    {
      name: 'Email'
    },
    {
      name: 'Date Created'
    },
  ]

  return (
    <table className="table relative max-h-[40vh]">
      <Caption
        title="Users Table"
        description="List of all users"
        setSearchedVal={setSearchedVal}
      />
      <TableHead theads={tHeads} />
      {loading ? (
        <div className="absolute insert-0 flex justify-center w-full py-8">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <tbody>
          {users?.filter((row: IUser) =>
            !searchedVal?.length || row?.name
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()))
            ?.map((user: IUser) => <UserItem key={user?.id} {...user} />)}
        </tbody>
      )}
    </table>
  )
}

export default UserList
