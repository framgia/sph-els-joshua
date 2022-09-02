import useSWR from 'swr'
import React from 'react'
import tw from 'twin.macro'
import { NextPage } from 'next'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/dashboard.styles'
import { authProtected } from '~/utils/auth-protected'
import DashboardList from '~/components/user/DashboardList'
import DashboardProfileCard from '~/components/user/DashboardProfileCard'

const Dashboard: NextPage = (): JSX.Element => {
  const { data: dashboard } = useSWR('/api/dashboards', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })
  const user = { ...dashboard?.data?.user }
  const lessons = { ...dashboard?.data?.lessons }
  const activities = dashboard?.data?.activities

  return (
    <Layout metaTitle="Dashboard"> 
      <main 
        css={styles.wrapper}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        {!dashboard 
        ? <Loading /> 
        : (
            <>
              <DashboardProfileCard 
                user={user}
                lessons={lessons}
              />
              <section 
                css={styles.section}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="400"
              >
                <div css={styles.card_title}>
                  <h1>Activities</h1>
                </div>        
                <div css={styles.card_content}>
                  {!activities 
                  ? <Loading /> 
                  : (
                    <>
                      {!activities.length ? (
                        <p css={tw`text-sm text-gray-500`}>No activities yet.</p>
                      ) : <DashboardList activities={activities} /> }
                    </>
                  )}
                </div>
              </section>
            </>
        )}
      </main>
    </Layout>
  )
}

export default authProtected(Dashboard)
