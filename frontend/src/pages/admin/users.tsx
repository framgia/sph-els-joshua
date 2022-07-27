import { NextPage } from 'next'
import React, { useState } from 'react'

import { users } from '~/data/userList'
import Layout from '~/layouts/adminLayout'
import UserList from '~/components/admin/UserList'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'

const Users: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState(false)

  const [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 5
  const pagesVisited = pageNumber * userPerPage

  const displayUsers = users?.slice(pagesVisited, pagesVisited + userPerPage)

  const pageCount = Math.ceil(users?.length / userPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <Layout metaTitle="Users">
      <main className="pt-4 px-4">
        <section className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <UserList users={displayUsers} loading={loading} />
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
