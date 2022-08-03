import React from 'react'

import Avatar from '~/components/Avatar'
import Layout from '~/layouts/userLayout'
import { classNames } from '~/utils/classNames'
import ActivityList from '~/components/user/ActivityList'

const Profile = (): JSX.Element => {
  return (
    <Layout metaTitle="Profile">
      <div className="flex pt-5 space-x-4 overflow-hidden">
        <section className="w-1/2 min-h-[20vh]">
          <div className="max-w-sm bg-white shadow-sm border rounded-lg py-6">
            <div className="flex flex-col items-center pb-3">
                <div className="inline-flex rounded-full shadow-lg">
                  <Avatar 
                    url="https://avatars.githubusercontent.com/u/38458781?v=4" 
                    width={112}
                    height={112}
                  />
                </div>
                <h5 className="mt-3 text-xl font-medium text-gray-900 pb-3">Joshua Galit</h5>
                <div className="flex items-center space-x-8 border-t pt-4">
                  <div className="flex items-center flex-col space-y-2">
                    <p className="text-xs font-bold">50</p>
                    <span className="text-xs font-medium">Followers</span>
                  </div>
                  <div className="flex items-center flex-col space-y-2">
                    <p className="text-xs font-bold">20</p>
                    <span className="text-xs font-medium">Following</span>
                  </div>
                </div>
                <div className="flex flex-col py-5">
                  <button 
                    type="button"
                    className="btn-default rounded-full px-12 py-1"
                  >
                    Follow
                  </button>
                  <a href="#" className={classNames(
                    'link font-semibold text-xs text-center mt-5'
                  )}>Learned 20 words</a>
                </div>
            </div>
          </div>
        </section>
        <section className="w-full max-h-[60vh] overflow-hidden overflow-y-auto shadow-sm border rounded-lg">
          <div className="py-4 px-6 border-b">
            <h1 className="font-bold">Activities</h1>
          </div>        
          <div className="pt-2 pb-4 px-6 divide-y space-y-2">
            <ActivityList activities={[0,1,2,3,4,5,6,7,8,9,10]} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Profile
