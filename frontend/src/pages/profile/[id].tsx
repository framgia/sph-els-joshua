import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
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
      <div className="flex pt-5 space-x-4 overflow-hidden">
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
            <section className="w-full max-h-[60vh] overflow-hidden overflow-y-auto shadow-sm border rounded-lg">
              <div className="py-4 px-6 border-b">
                <h1 className="font-bold">Activities</h1>
              </div>        
              <div className="pt-2 pb-4 px-6 divide-y space-y-2">
                <ActivityList 
                  user={user?.data} 
                  activities={[0,1,2,3,4,5,6,7,8,9,10]} 
                />
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  )
}

export default UserProfile
