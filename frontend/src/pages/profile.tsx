import useSWR from 'swr'
import React from 'react'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { IUser } from '~/data/interfaces'
import { Spinner } from '~/utils/Spinner'
import { authProtected } from '~/utils/auth-protected'
import ProfileCard from '~/components/user/ProfileCard'
import ActivityList from '~/components/user/ActivityList'

const Profile = (): JSX.Element => {
  const { user: author } = useAuth({
    middleware: 'auth'
  })

  const { data: user, mutate } = useSWR(`/api/user-privilege/${author?.id}`, async () => fetcher(`/api/user-privilege/${author?.id}`), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle={`${user ? user?.data?.name : 'Profile'}`}> 
      <div className="flex pt-5 space-x-4 overflow-hidden">
        {!user ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-orange-500" />
            </div>
          ) : (
            <>
              <ProfileCard 
                mutate={mutate}
                user={user?.data} 
                isAuthor 
              />
              <section className="w-full max-h-[60vh] overflow-hidden overflow-y-auto shadow-sm border rounded-lg">
                <div className="py-4 px-6 border-b">
                  <h1 className="font-bold">Activities</h1>
                </div>        
                <div className="pt-2 pb-4 px-6 divide-y space-y-2">
                  <ActivityList 
                    activities={[0,1,2,3,4,5,6,7,8,9,10]} 
                    user={user?.data} 
                  />
                </div>
              </section>
            </>
        )}
      </div>
    </Layout>
  )
}

export default authProtected(Profile)
