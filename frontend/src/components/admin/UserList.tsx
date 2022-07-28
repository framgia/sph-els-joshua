import moment from 'moment'
import React, { useState } from 'react'

import Caption from './Caption'
import Avatar from './../Avatar'
import TableHead from './Tablehead'
import { IThead, IUser } from '~/data/interfaces'

type Props = {
  users: IUser[] | any
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
    <table className="table">
      <Caption
        title="Users Table"
        description="List of all users"
        setSearchedVal={setSearchedVal}
      />
      <TableHead theads={tHeads} />
      <tbody>
        {users?.filter((row: IUser) =>
            !searchedVal?.length || row?.name
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()) 
            )
          ?.map((user: IUser) => (
          <tr key={user?.id} className="table-tbody-tr">
            <td className="table-tbody-td">
              {user?.id}
            </td>
            <th scope="row" className="table-tbody-th">
              <Avatar 
                width={32}
                height={32}
                url={`https://i.pravatar.cc/60?u=${user?.id}`} 
              />
              <div className="pl-3">
                <div className="text-sm font-semibold">{user?.name}</div>
              </div>  
            </th>
            <td className="table-tbody-td">
              {user?.is_admin ? 'Admin' : 'User'}
            </td>
            <td className="table-tbody-td">
              {user?.email}
            </td>
            <td className="table-tbody-td">
              {moment(user?.created_at).format("MMM Do YY")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList
