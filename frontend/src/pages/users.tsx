import useSWR from 'swr'
import Link from 'next/link'
import { NextPage } from 'next'
import ReactAvatar from 'react-avatar'
import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Avatar from '~/components/Avatar'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/userLayout'
import { IProfile } from '~/data/interfaces'
import { useFollow } from '~/helpers/follow'
import { classNames } from '~/utils/classNames'
import { authProtected } from '~/utils/auth-protected'

const UserList: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  
  const { followStatus, handleFollow } = useFollow()
  const { user: author } = useAuth({ middleware: 'auth' })
  
  const { data: users, mutate } = useSWR('/api/user-privilege', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle="Users">
      <section
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="400"
      >
        <ul className="mt-3 divide-y divide-gray-100">
          {(!users && author) ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-red-500" />
            </div>
          ) : (
            <>
              {users?.data?.map((user: IProfile, i: number) => (
                <li 
                  key={i}
                  className={classNames(
                    'hover:bg-red-50 px-4 py-2',
                    'flex items-center justify-between bg-white rounded'
                  )}
                  data-aos="fade-up"
                  data-aos-delay={`${400+(i+200)}`}
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
                          {!user?.avatar_url ? (
                            <ReactAvatar 
                              name={user?.name} 
                              size="40" 
                              round="100%" 
                            />
                          ) : (
                            <Avatar 
                              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                              width={40}
                              height={40}
                            />
                          )}
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
      </section>
    </Layout>
  )
}


export default authProtected(UserList)
