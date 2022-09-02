import React from 'react'
import tw from 'twin.macro'
import moment from 'moment'
import ReactAvatar from 'react-avatar'

import Avatar from './../Avatar'
import Loading from './../Loading'
import { IUser } from '~/data/interfaces'

type Props = {
  activities: {
    activity_title: string
    created_at: string
  }[]
  user: IUser
}

const styles = {
  activitylist: [
    tw`
      pt-2 flex items-center space-x-4
      [> div]:(text-sm)
      [> div > div]:(flex items-center space-x-2)
      [> div > div > span]:(mr-2 line-clamp-2)
      [> div > span]:(text-xs font-medium text-gray-600)
    `
  ]
}

const ActivityList: React.FC<Props> = ({ activities, user }): JSX.Element => {
  return (
    <>
      {!activities?.length 
      ? <Loading />
      : (
        <>
          {activities.map(({ activity_title, created_at }, i) => (
            <div key={i} css={styles.activitylist}>
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
              <div>
                <div>
                  <span dangerouslySetInnerHTML={{__html: activity_title }}></span> 
                </div>
                <span>{moment(created_at).fromNow()}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default ActivityList
