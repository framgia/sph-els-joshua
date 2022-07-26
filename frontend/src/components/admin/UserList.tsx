import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'

type Props = {
  users: IUser[] | any
  loading: boolean
}

const UserList: React.FC<Props> = (props): JSX.Element => {
  const { users, loading } = props
  const [searchedVal, setSearchedVal] = useState('')

  return (
    <table className="table">
      <Captions setSearchedVal={setSearchedVal} />
      <Thead />
      <tbody>
        {users?.filter((row: IUser) =>
            !searchedVal?.length || row?.name
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()) 
            )
          ?.map((user: IUser) => (
          <tr key={user?.id} className="table-tbody-tr">
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

function Captions ({ setSearchedVal }: { setSearchedVal: any }) {
  return (
    <caption className="p-5 text-lg text-left text-gray-900 bg-white dark:text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold ">Users Table</h1>
          <p className="mt-1 text-sm font-normal text-gray-500">List of all users</p>
        </div>
        <div className="mt-1 relative lg:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ImSearch className="ml-0.5 w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            onChange={(e) => setSearchedVal(e.target.value)}
            className="form-control pl-10 mt-0"
            placeholder="Search"
          />
        </div>
      </div>
    </caption>
  )
}

function Thead () {
  return (
    <thead className="table-thead">
      <tr>
        <th scope="col" className="table-thead-th">
          Name
        </th>
        <th scope="col" className="table-thead-th">
          Role
        </th>
        <th scope="col" className="table-thead-th">
          Email
        </th>
        <th scope="col" className="table-thead-th">
          Date Created
        </th>
      </tr>
    </thead>
  )
}

export default UserList
