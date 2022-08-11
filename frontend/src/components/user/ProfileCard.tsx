import React from 'react'

import Avatar from '../Avatar'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'

type Props = {
  user: IUser
}

const ProfileCard: React.FC<Props> = (props): JSX.Element => {
  const { user } = props

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
  )
}

export default ProfileCard
