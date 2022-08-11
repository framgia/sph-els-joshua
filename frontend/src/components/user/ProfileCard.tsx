import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

import Avatar from '../Avatar'
import axios from '~/lib/axios'
import { useAuth } from '~/hooks/auth'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'

type Props = {
  user: IUser
  mutate: any
  isAuthor: boolean
}

const ProfileCard: React.FC<Props> = (props): JSX.Element => {
  const { user, mutate, isAuthor } = props
  const [loading, setLoading] = useState<boolean>(false)

  const { user: author } = useAuth({
    middleware: 'auth'
  })

  const userFollowStatus = (user: IUser): string => {
    const current_id = user?.followers?.map(({ id }) => id)
    return current_id == author?.id ? 'Unfollow' : 'Follow'
  }

  const handleFollow = async (user: IUser): Promise<void> => {
    setLoading(true)
    const current_id = user?.followers?.map(({ id }) => id)

    if (current_id == author?.id) {
      // UNFOLLOW
      return await 
              axios
                .patch(`/api/follow/${user?.id}`, { following_id: user?.id })
                .then(async () => {
                  await mutate()
                  toast.success(`You unfollow ${user?.name}`)
                })
                .finally(() => setLoading(false))
    } else {
      // FOLLOW
      return await 
              axios
                .post('/api/follow', {
                  following_id: user?.id
                })
                .then(async () => {
                  await mutate()
                  toast.success(`You follow ${user?.name}`)
                })
                .finally(() => setLoading(false))
    }
  }

  return (
    <section className="w-1/2 min-h-[20vh]">
      <div className="max-w-sm bg-white shadow-sm border rounded-lg py-6">
        <div className="flex flex-col items-center pb-3">
            <div className="inline-flex rounded-full shadow-lg">
              <Avatar 
                url={`${user ? user?.avatar_url : 'https://i.stack.imgur.com/l60Hf.png'}`}
                width={112}
                height={112}
              />
            </div>
            <h5 className="mt-3 text-xl font-medium text-gray-900 pb-3">{user?.name}</h5>
            <div className="flex items-center space-x-8 border-t pt-4">
              <div className="flex items-center flex-col space-y-2">
                <p className="text-xs font-bold">{user?.followers?.length}</p>
                <span className="text-xs font-medium">Followers</span>
              </div>
              <div className="flex items-center flex-col space-y-2">
                <p className="text-xs font-bold">{user?.following?.length}</p>
                <span className="text-xs font-medium">Following</span>
              </div>
            </div>
            <div className="flex flex-col py-5">
              {!isAuthor && (
                <button 
                  type="submit"
                  disabled={loading}
                  onClick={() => handleFollow(user)}
                  className="btn-default rounded-full px-12 py-1"
                >
                  {userFollowStatus(user)}
                </button>
              )}
              <a href="#" className={classNames(
                'link font-semibold text-xs text-center mt-5'
              )}>Learned 20 words</a>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
