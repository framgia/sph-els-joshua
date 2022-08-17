import React from 'react'
import moment from 'moment'
import Link from 'next/link'

import Avatar from './../Avatar'
import { IAnswer, IUser } from '~/data/interfaces'

type Props = {
  activities: any[]
  user: IUser
  isAuthor: boolean
}

const ActivityList: React.FC<Props> = ({ activities, user, isAuthor }): JSX.Element => {
  const defaultAvatar = 'https://i.stack.imgur.com/l60Hf.png'

  return (
    <>
      {!activities?.length ? (
        <div className="pt-2 ">
          <p className="text-sm text-gray-500">No activities yet.</p>
        </div>
      ) : (
        <>
          {activities?.map((activity, i: number) => {
            const getCountCorrectAnswer = activity.lessons?.answers?.filter((answer: IAnswer) => answer?.choice_id === answer?.question?.choice_id).length
            const getQuestionCount = activity.lessons?.answers?.length
            const questions = activity.lessons?.answers?.map((answer: IAnswer) => answer?.question)
            const getCategoryTitle = questions?.map((cat: any) => cat?.category?.title)

            return (
              <div key={i} className="pt-2 flex items-center space-x-4">
                <Avatar 
                  url={`${user.avatar_url === null ? defaultAvatar : user?.avatar_url}`}
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <div className="flex items-center space-x-2">
                    <a href="#" className="link text-orange-500 mr-2 line-clamp-2">
                      {isAuthor ? 'You' : user?.name}
                    </a> 
                    {activity.following_user ? 'followed' : 'learned'} 
                    {activity.following_user && (
                      <Link href={`/profile/${activity.following_user.id}`}>
                        <a className="link text-orange-500">
                          {activity.following_user.name}
                        </a>
                      </Link>
                    )}
                    {activity.lessons && (
                      <div className="flex">
                        <span>{`${getCountCorrectAnswer} of ${getQuestionCount} in `}</span>
                        <Link href={`/results/${activity?.lessons?.id}`}>
                          <a className="ml-2 text-orange-500 link">
                            {getCategoryTitle[0]}
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{moment(activity.created_at).fromNow()}</span>
                </div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default ActivityList
