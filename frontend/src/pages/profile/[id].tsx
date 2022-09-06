import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/profile.styles'
import { authProtected } from '~/utils/auth-protected'
import ProfileCard from '~/components/user/ProfileCard'
import ActivityList from '~/components/user/ActivityList'

const UserProfile: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { user: author } = useAuth({ middlware: 'auth' }) 
  const { id } = router.query

  const { data, mutate } = useSWR(`/api/user-privilege/${id}`, fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })
  const user = data?.data?.user
  const activities = data?.data?.activities

  return (
    <Layout metaTitle={`${user ? user?.name : ''}`}>
      <main 
        css={styles.main}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        {!user 
        ? <Loading /> 
        : (
          <>
            <ProfileCard 
              user={user}
              mutate={mutate} 
              isAuthor={author?.id === id} 
            />
            <section 
              css={styles.section}
              data-aos="fade-down"
              data-aos-delay="600"
            >
              <div css={styles.card_title}>
                <h1>Activities</h1>
              </div>        
              <div css={styles.card_content}>
                <ActivityList 
                  activities={activities} 
                  user={user} 
                />
              </div>
            </section>
          </>
        )}
      </main>
    </Layout>
  )
}

export default authProtected(UserProfile)
