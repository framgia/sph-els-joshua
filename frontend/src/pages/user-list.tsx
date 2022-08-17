import useSWR from 'swr'
import Link from 'next/link'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Avatar from '~/components/Avatar'
import { IUser } from '~/data/interfaces'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/userLayout'
import { useFollow } from '~/helpers/follow'
import { classNames } from '~/utils/classNames'
import { authProtected } from '~/utils/auth-protected'

const UserList: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  
  const { followStatus, handleFollow } = useFollow()
  const { user: author } = useAuth({
    middleware: 'auth'
  })
  
  const { data: users, mutate } = useSWR('/api/user-privilege', async () => fetcher('/api/user-privilege'), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const defaultAvatar = 'https://i.stack.imgur.com/l60Hf.png'

  return (
    <Layout metaTitle="Accounts">
      <ul className="mt-3 divide-y divide-gray-100">
        {(!users && author) ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-orange-500" />
          </div>
        ) : (
          <>
            {users?.data?.map((user: IUser, i: number) => (
              <li 
                key={i}
                className={classNames(
                  'hover:bg-orange-50 px-2 py-1',
                  'flex items-center justify-between'
                )}
              >
                <div
                  className={classNames(
                    'w-full rounded-lg flex items-center py-1.5 space-x-4',
                    'transition ease-in-out duration-150'
                  )}
                >
                  <div className="relative rounded-full overflow-hidden">
                    <Link href={`/profile/${user?.id}`}>
                      <a className="link text-gray-900 flex flex-row items-center space-x-1">
                        <Avatar
                          url={`${user.avatar_url === null ? defaultAvatar : user?.avatar_url}`} 
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/profile/${user?.id}`}>
                      <a className="link text-gray-900 flex flex-row items-center space-x-1">
                        <span className="text-sm font-bold capitalize">{user?.name}</span>
                        <MdVerified className="w-4 h-4 text-[#20d5ec]" />
                      </a>
                    </Link>
                      <h1 className={classNames(
                        'text-xs font-medium text-left',
                        'text-gray-600 lowercase'
                      )}>{user?.email}</h1>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={classNames(
                    'btn-default rounded-full px-5 py-1',
                    'font-semibold text-xs'
                  )}
                  onClick={() => handleFollow({ user, author, mutate, setLoading })}
                >
                  {followStatus({ user, author })}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </Layout>
  )
}


export default authProtected(UserList)
