import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'

import Loading from './../Loading'

type Props = {
  activities: {
    activity_title: string
    created_at: string
  }[]
}

const styles = {
  dashboardlist: [
    tw`
      pt-2 flex items-center space-x-4
      [> div]:(text-sm)
      [> div > div]:(flex items-center space-x-2)
      [> div > span]:(text-xs font-medium text-gray-600)
    `
  ]
}

const DashboardList: React.FC<Props> = ({ activities }): JSX.Element => {
  return (
    <>
      {!activities 
      ? <Loading />
      : (
        <>
         {activities?.map(({ activity_title, created_at }, i) => (
          <div key={i} css={styles.dashboardlist}>
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

export default DashboardList
