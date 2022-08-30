import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import ReactAvatar from 'react-avatar'
import { AiFillCaretLeft } from 'react-icons/ai'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import axios from '~/lib/axios'
import { fetcher } from '~/lib/fetcher'
import Avatar from '~/components/Avatar'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/userLayout'
import { classNames } from '~/helpers/classNames'
import { authProtected } from '~/utils/auth-protected'
import DashboardList from '~/components/user/DashboardList'

type Props = {
  fallbackData: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  const fallbackData = await fetcher('https://jsonplaceholder.typicode.com/todos/1')
  return {
    props: {
      fallbackData
    }
  }
}

const Dashboard: NextPage<Props> = ({ fallbackData }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  // const { data: dashboard } = useSWR('/api/dashboards', fetcher, {
  //   // refreshInterval: 1000,
  //   // revalidateOnMount: true
  // })
  // const user = { ...dashboard?.data?.user }
  // const lessons = { ...dashboard?.data?.lessons }
  // const activities = dashboard?.data?.activities

  return (
    <Layout metaTitle="Dashboard"> 
      <pre>{JSON.stringify(fallbackData, null, 2)}</pre>
      {/* <section className={classNames(
          'flex flex-col md:flex-row space-y-4 md:space-y-0',
          'md:space-x-4 overflow-hidden pt-5'
        )}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        {dashboard ? (
            // <div className="flex justify-center w-full py-8">
            //   <Spinner className="w-6 h-6 text-red-500" />
            // </div>
            <pre>{JSON.stringify(fallbackData, null, 2)}</pre>
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
                    <Link href={`/profile/${user?.id}`}>
                      <a className="link text-gray-700 flex flex-row items-center space-x-1">
                        {!user?.avatar_url ? (
                          <ReactAvatar 
                            name={user?.name} 
                            size="120" 
                            round="100%" 
                          />
                        ) : (
                          <Avatar 
                            url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                            width={120}
                            height={120}
                          />
                        )}
                      </a>
                    </Link>
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <div className="flex flex-row justify-between">
                      <Link href={`/profile/${user?.id}`}>
                        <a className="link ml-3 font-semibold text-gray-900 text-base">{user?.name}</a>
                      </Link>
                      <AiFillCaretLeft className="w-4 h-4" />
                    </div>
                    <div className="ml-3 space-y-1">
                      <a 
                        href="#" 
                        className="link text-red-500 text-xs"
                      >Learned {lessons?.count_correct_lessons_answer} words</a>
                      <a 
                        href="#" 
                        className="link text-red-500 text-xs"
                      >Learned {lessons?.count_lessons_taken} lessons</a>
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
                  {!activities ? (
                    <div className="flex justify-center w-full py-8">
                      <Spinner className="w-6 h-6 text-red-500" />
                    </div>
                  ) : (
                    <>
                      {!activities.length ? (
                        <p className="text-sm text-gray-500">No activities yet.</p>
                      ) : <DashboardList activities={activities} /> }
                    </>
                  )}
                </div>
              </section>
            </>
        )}
      </section> */}
    </Layout>
  )
}

export default authProtected(Dashboard)
