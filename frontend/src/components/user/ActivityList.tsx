import React from 'react'
import moment from 'moment'
import ReactAvatar from 'react-avatar'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'

type Props = {
  activities: {
    activity_title: string
    created_at: string
  }[]
  user: IUser
}

const ActivityList: React.FC<Props> = ({ activities, user }): JSX.Element => {
  return (
    <>
      {!activities?.length ? (
        <div className="pt-2 ">
          <p className="text-sm text-gray-500">No activities yet.</p>
        </div>
      ) : (
        <>
          {activities.map(({ activity_title, created_at }, i) => (
            <div key={i} className="pt-2 flex items-center space-x-4">
              {!user?.avatar_url ? (
                <ReactAvatar 
                  name={user?.name} 
                  size="40" 
                  round="100%" 
                />
              ) : (
                <Avatar 
                  url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                  width={40}
                  height={40}
                />
              )}
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <span className="mr-2 line-clamp-2" dangerouslySetInnerHTML={{__html: activity_title }}></span> 
                </div>
                <span className="text-xs font-medium text-gray-600">{moment(created_at).fromNow()}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default ActivityList
