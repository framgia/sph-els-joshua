import useSWR from 'swr'
import Link from 'next/link'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Avatar from '~/components/Avatar'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/userLayout'
import { classNames } from '~/utils/classNames'
import { IAnswer, ILesson } from '~/data/interfaces'
import { authProtected } from '~/utils/auth-protected'
import { defaultAvatar } from '~/helpers/defaultAvatar'
import DashboardList from '~/components/user/DashboardList'
import LessonLearnedDialog from '~/components/user/LessonLearnedDialog'

const Dashboard: NextPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const { user: author } = useAuth({
    middleware: 'auth'
  })

  const { data: user } = useSWR(`/api/dashboards/${author?.id}`, async () => fetcher(`/api/dashboards/${author?.id}`), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const getArrayOfScores = user?.data?.lessons?.map((lesson: ILesson) => lesson.answers.filter((answer: IAnswer) => answer.question.choice_id === answer.choice_id).length)
  const sumAllScores = (arr: []): number => {
    let total = 0;
    for(let i in arr) {
      total += arr[i]
    }
    return total
  }
  const getTotalCorrectLessonCount = sumAllScores(getArrayOfScores)

  return (
    <Layout metaTitle="Dashboard"> 
      <section className={classNames(
          'flex flex-col md:flex-row space-y-4 md:space-y-0',
          'md:space-x-4 overflow-hidden pt-5'
        )}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        {!author ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-red-500" />
            </div>
          ) : (
            <>
              <div  
                className="w-full md:w-1/2 flex flex-col justify-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="ml-6 font-semibold">Dashboard</h2>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href={`/profile/${author?.id}`}>
                      <a className="link text-gray-700 flex flex-row items-center space-x-1">
                        <Avatar
                          url={`${
                            author.avatar_url === null ? 
                            defaultAvatar : 
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${author?.avatar_url}`
                          }`}
                          width={120}
                          height={120}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <div className="flex flex-row justify-between">
                      <Link href={`/profile`}>
                        <a className="link ml-3 font-semibold text-gray-700 text-black text-base">{author?.name}</a>
                      </Link>
                      <AiFillCaretLeft className="w-4 h-4" />
                    </div>
                    <div className="ml-3 space-y-1">
                      <a href="#" className="link text-red-500 text-xs">Learned {getTotalCorrectLessonCount} words</a>
                      <a 
                        href="#" 
                        onClick={toggle}
                        className="link text-red-500 text-xs"
                      >Learned {user?.totalLessons} lessons</a>
                      <LessonLearnedDialog 
                         isOpen={isOpen}
                         closeModal={toggle}
                         lessons={user?.data?.lessons}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <section 
                className="w-full overflow-hidden shadow-primary rounded-lg bg-white"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="400"
              >
                <div className="py-4 px-6 border-b">
                  <h1 className="font-bold">Activities</h1>
                </div>        
                <div className="pt-2 pb-4 px-6 divide-y space-y-2 max-h-[50vh] overflow-y-auto">
                  {!user?.activities ? (
                    <div className="flex justify-center w-full py-8">
                      <Spinner className="w-6 h-6 text-red-500" />
                    </div>
                  ) : (
                    <>
                      {!user?.activities.length ? (
                        <p className="text-sm text-gray-500">No activities yet.</p>
                      ) : <DashboardList activities={user?.activities} /> }
                    </>
                  )}
                </div>
              </section>
            </>
        )}
      </section>
    </Layout>
  )
}

export default authProtected(Dashboard)
