import useSWR from 'swr'
import React from 'react'
import Link from 'next/link'
import { MdVerified } from 'react-icons/md'

import { fetcher } from '~/lib/fetcher'
import Avatar from '~/components/Avatar'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/userLayout'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'

const UserList = (): JSX.Element => {
  const { data: users } = useSWR('/api/user-privilege', async () => fetcher('/api/user-privilege'), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle="Accounts">
      <ul className="mt-3 divide-y divide-gray-100">
        {!users ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-orange-500" />
          </div>
        ) : (
          <>
            {users?.data?.map(({ id, name, email, avatar_url }: IUser, i: number) => (
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
                    <Link href={`/profile/${id}`}>
                      <a className="link text-gray-900 flex flex-row items-center space-x-1">
                        <Avatar
                          url={`${avatar_url}`} 
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/profile/${id}`}>
                      <a className="link text-gray-900 flex flex-row items-center space-x-1">
                        <span className="text-sm font-bold capitalize">{name}</span>
                        <MdVerified className="w-4 h-4 text-[#20d5ec]" />
                      </a>
                    </Link>
                      <h1 className={classNames(
                        'text-xs font-medium text-left',
                        'text-gray-600 lowercase'
                      )}>{email}</h1>
                  </div>
                </div>
                <button 
                  type="button" 
                  className={classNames(
                    'btn-default rounded-full px-5 py-1',
                    'font-semibold text-xs'
                  )}
                >
                  Follow
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </Layout>
  )
}


export default UserList
