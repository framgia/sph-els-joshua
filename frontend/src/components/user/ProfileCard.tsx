import { KeyedMutator } from 'swr'
import ReactAvatar from 'react-avatar'
import React, { useState } from 'react'

import Avatar from '../Avatar'
import { useAuth } from '~/hooks/auth'
import { IProfile } from '~/data/interfaces'
import { useFollow } from '~/helpers/follow'

type Props = {
  user: IProfile
  mutate: KeyedMutator<any>
  isAuthor: boolean
}

const ProfileCard: React.FC<Props> = (props): JSX.Element => {
  const { user, mutate, isAuthor } = props
  const [loading, setLoading] = useState<boolean>(false)
  
  const { followStatus, handleFollow } = useFollow()
  const { user: author } = useAuth({
    middleware: 'auth'
  })

  return (
    <section className="w-full md:w-1/2 min-h-[20vh]">
      <div className="w-full md:max-w-sm bg-white shadow-primary rounded-lg py-6">
        <div className="flex flex-col items-center pb-3">
            <div className="inline-flex rounded-full shadow-lg">
              {!user?.avatar_url ? (
                <ReactAvatar 
                  name={user?.name} 
                  size="150" 
                  round="100%" 
                />
              ) : (
                <Avatar 
                  url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                  width={150}
                  height={150}
                />
              )}
            </div>
            <h5 className="mt-3 text-xl font-medium text-gray-900 pb-3">{user?.name}</h5>
            <div className="flex items-center space-x-8 border-t pt-4">
              <div className="flex items-center flex-col space-y-2">
                <p className="text-xs font-bold">{user?.count_followers}</p>
                <a href="#" className="text-xs text-black font-medium link">Followers</a>
              </div>
              <div className="flex items-center flex-col space-y-2">
                <p className="text-xs font-bold">{user?.count_followings}</p>
                <a href="#" className="text-xs text-black font-medium link">Following</a>
              </div>
            </div>
            <div className="flex flex-col py-5">
              {(!isAuthor && user?.id !== author?.id) && (
                <button 
                  type="submit"
                  disabled={loading}
                  onClick={() => handleFollow({ user, author, mutate, setLoading })}
                  className="btn-default rounded-full px-12 py-1"
                >
                  {followStatus({ user, author })}
                </button>
              )}
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
