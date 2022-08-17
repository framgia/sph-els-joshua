import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { classNames } from '~/utils/classNames'
import { authProtected } from '~/utils/auth-protected'
import ProfileCard from '~/components/user/ProfileCard'
import ActivityList from '~/components/user/ActivityList'

const UserProfile: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const { data: user, mutate } = useSWR(`/api/user-privilege/${id}`, async () => fetcher(`/api/user-privilege/${id}`), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle={`${user ? user?.data?.name : ''}`}>
      <div className={classNames(
        'flex flex-col md:flex-row space-y-4 md:space-y-0',
        'md:space-x-4 overflow-hidden pt-5'
      )}>
        {!user ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-orange-500" />
          </div>
        ) : (
          <>
            <ProfileCard 
              user={user?.data}
              mutate={mutate} 
              isAuthor={false} 
            />
            <section className="w-full overflow-hidden shadow-sm border rounded-lg">
              <div className="py-4 px-6 border-b">
                <h1 className="font-bold">Activities</h1>
              </div>        
              <div className="pt-2 pb-4 px-6 divide-y space-y-2 max-h-[50vh] overflow-y-auto">
                <ActivityList 
                  activities={user?.activities} 
                  user={user?.data} 
                  isAuthor={false}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  )
}

export default authProtected(UserProfile)
