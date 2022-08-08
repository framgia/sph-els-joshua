import React from 'react'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'

type Props = {
  activities: number[]
  user: IUser
}

const ActivityList: React.FC<Props> = ({ activities, user }): JSX.Element => {
  return (
    <>
      {activities?.map((i) => (
        <div key={i} className="pt-2 flex items-center space-x-4">
          <Avatar 
            url={`${user ? user?.avatar_url : `https://i.pravatar.cc/60`}`}
            width={40}
            height={40}
          />
          <div className="text-sm">
            <div className="flex items-center space-x-2">
              <a href="#" className="link text-orange-500 mr-2 line-clamp-2">You</a> learned 20 of 20 words in 
              <a href="#" className="link text-orange-500">Basic 500</a>
            </div>
            <span className="text-xs font-medium text-gray-600">2 days ago</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default ActivityList
