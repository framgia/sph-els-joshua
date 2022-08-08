import React from 'react'

import { useAuth } from '~/hooks/auth'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import ActivityList from '~/components/user/ActivityList'
import ProfileCard from '~/components/user/ProfileCard'

const Profile = (): JSX.Element => {
  const { user } = useAuth({
    middleware: 'admin'
  })

  return (
    <Layout metaTitle="Profile">
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
                  <ActivityList activities={[0,1,2,3,4,5,6,7,8,9,10]} user={user} />
                </div>
              </section>
            </>
        )}
      </div>
    </Layout>
  )
}

export default Profile
