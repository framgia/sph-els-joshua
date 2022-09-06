import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/users.styles'
import UserList from '~/components/user/UserList'
import { authProtected } from '~/utils/auth-protected'

const Users: NextPage = (): JSX.Element => {
  const { user: author } = useAuth({ middleware: 'auth' })
  
  const { data, mutate } = useSWR('/api/user-privilege', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })
  const users = data?.data

  return (
    <Layout metaTitle="Users">
      <section
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="400"
      >
        <ul css={styles.ul}>
          {(!users && author) 
          ? <Loading /> 
          : <UserList 
              users={users} 
              author={author} 
              mutate={mutate} 
            />
          }
        </ul>
      </section>
    </Layout>
  )
}

export default authProtected(Users)
