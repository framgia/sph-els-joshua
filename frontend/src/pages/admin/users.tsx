import useSWR from 'swr'
import { NextPage } from 'next'
import React, { useState } from 'react'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/adminLayout'
import { styles } from '~/twin/global.styles'
import UserList from '~/components/admin/UserList'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'

const Users: NextPage = (): JSX.Element => {
  const { data: users } = useSWR('/api/users', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const loading = !users?.data

  const [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 5
  const pagesVisited = pageNumber * userPerPage

  const displayUsers = users?.data?.slice(pagesVisited, pagesVisited + userPerPage)

  const pageCount = Math.ceil(users?.data?.length / userPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <Layout metaTitle="Users">
      <main css={styles.admin_main}>
        <section css={styles.admin_section}>
          <UserList 
            users={displayUsers} 
            loading={loading} 
          />
          {!loading && (
            <Pagination 
              length={users?.length}
              pageNumber={pageNumber}
              pageCount={pageCount}
              actions={{ changePage }}
            />
          )}
        </section>
      </main>
    </Layout>
  )
}

export default adminProtected(Users)
