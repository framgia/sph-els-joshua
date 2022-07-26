import React from 'react'
import moment from 'moment'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'
import { ImSearch } from 'react-icons/im'

type Props = {
  users: IUser[]
}

const UserList: React.FC<Props> = (props): JSX.Element => {
  const { users } = props

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <caption className="p-5 text-lg text-left text-gray-900 bg-white dark:text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold ">Users Table</h1>
            <p className="mt-1 text-sm font-normal text-gray-500">List of all users</p>
          </div>
          <div>
          <form action="#" method="GET">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ImSearch className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="form-control pl-10 mt-0"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </caption>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="py-3 px-6">
            Name
          </th>
          <th scope="col" className="py-3 px-6">
            Role
          </th>
          <th scope="col" className="py-3 px-6">
            Email
          </th>
          <th scope="col" className="py-3 px-6">
            Date Created
          </th>
        </tr>
      </thead>
      <tbody>
      {users?.map((user: IUser) => (
        <tr key={user?.id} className="bg-white border-b hover:bg-gray-50">
          <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
            <Avatar 
              width={32} 
              height={32} 
              url={`https://i.pravatar.cc/60?u=${user?.id}`}  
            />
            <div className="pl-3">
              <div className="text-base font-semibold">{user?.name}</div>
            </div>  
          </th>
          <td className="py-4 px-6">
            {user?.is_admin ? 'Admin' : 'User'}
          </td>
          <td className="py-4 px-6">
            {user?.email}
          </td>
          <td className="py-4 px-6">
            {moment(user?.created_at).format("MMM Do YY")}
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList
