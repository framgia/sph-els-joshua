import React from 'react'
import moment from 'moment'

import { IUser } from '~/data/interfaces'

type Props = {
  activities: any[]
  user: IUser
  author: IUser
}

const DashboardList: React.FC<Props> = ({ activities, author, user }): JSX.Element => {
  return (
    <>
      {activities?.length === 0 ? (
        <div className="pt-2 ">
          <p className="text-sm text-gray-500">No activities yet.</p>
        </div>
      ) : (
        <>
         {activities?.map(({ activity, created_at }, i) => (
          <div key={i} className="pt-2 flex items-center space-x-4">
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <span>{activity}</span>
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

export default DashboardList
