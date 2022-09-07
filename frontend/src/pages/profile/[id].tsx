import useSWR from 'swr'
import React from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { 
  GetStaticPaths, 
  GetStaticProps, 
  GetStaticPropsContext, 
  InferGetStaticPropsType, 
  NextPage 
} from 'next'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/profile.styles'
import { authProtected } from '~/utils/auth-protected'
import ProfileCard from '~/components/user/ProfileCard'
import ActivityList from '~/components/user/ActivityList'

type Props = {
  prefetchedData: string[]
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher('/api/profiles')
  return {
    paths: data?.map(({ id }: IParams) => ({
      params: {
        id
      }
    })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as IParams
  const { data } = await fetcher(`/api/profiles/${id}`)
 return {
  props: {
    prefetchedData: data
  }
 }
}

const UserProfile: NextPage<Props> = ({ prefetchedData }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter()
  const { user: author } = useAuth({ middlware: 'auth' }) 
  const { id } = router.query

  // const { data, mutate } = useSWR(`/api/profiles/${id}`, fetcher, {
  //   refreshInterval: 1000,
  //   revalidateOnMount: true
  // })
  // const user = data?.data?.user
  // const activities = data?.data?.activities

  return (
    // {`${user ? user?.name : ''}`}
    <Layout metaTitle=""> 
      <main 
        css={styles.main}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="300"
      >
        <pre>{JSON.stringify(prefetchedData, null, 2)}</pre>
        {/* {!user 
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
        )} */}
      </main>
    </Layout>
  )
}

export default authProtected(UserProfile)
