import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { IUser } from '~/data/interfaces'
import { Spinner } from '~/utils/Spinner'
import ActivityList from '~/components/user/ActivityList'
import ProfileCard from '~/components/user/ProfileCard'

const UserProfile = (): JSX.Element => {
  const router = useRouter()
  const [user, setUser] = useState<IUser>()

  const { id } = router.query

  useEffect(() => {
    const getUserProfileById = async () => {
      const { data: user } = await fetcher(`/api/user-privilege/${id}`)
      setUser(user)
    }
    getUserProfileById()
  }, [id])

  return (
    <Layout metaTitle={`${user ? user?.name : ''}`}>
      <div className="flex pt-5 space-x-4 overflow-hidden">
        {!user ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-orange-500" />
          </div>
        ) : (
          <>
            <ProfileCard user={user} />
            <section className="w-full max-h-[60vh] overflow-hidden overflow-y-auto shadow-sm border rounded-lg">
              <div className="py-4 px-6 border-b">
                <h1 className="font-bold">Activities</h1>
              </div>        
              <div className="pt-2 pb-4 px-6 divide-y space-y-2">
                <ActivityList 
                  user={user} 
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
