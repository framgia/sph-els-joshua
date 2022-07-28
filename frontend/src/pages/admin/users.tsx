import useSWR from 'swr'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import axios from '~/lib/axios'
import { IUser } from '~/data/interfaces'
import Layout from '~/layouts/adminLayout'
import UserList from '~/components/admin/UserList'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

const Users: NextPage = (): JSX.Element => {
  
  const { data: users, error } = useSWR('/api/users', async () => fetcher('/api/users'), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const [loading, setLoading] = useState(false)

  const [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 5
  const pagesVisited = pageNumber * userPerPage

  const displayUsers = users?.data?.slice(pagesVisited, pagesVisited + userPerPage)

  const pageCount = Math.ceil(users?.data?.length / userPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <Layout metaTitle="Users">
      <main className="pt-4 px-4">
        <section className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <UserList users={displayUsers} loading={!error && !users?.data} />
          <Pagination 
            length={users?.length}
            pageNumber={pageNumber}
            pageCount={pageCount}
            actions={{ changePage }}
          />
        </section>
      </main>
    </Layout>
  )
}

export default adminProtected(Users)
