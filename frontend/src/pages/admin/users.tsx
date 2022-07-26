import React from 'react'
import { NextPage } from 'next'

import { users } from '~/data/userList'
import Layout from '~/layouts/adminLayout'
import UserList from '~/components/admin/UserList'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'

const Users: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Users">
      <main className="pt-4 px-4">
        <section className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <UserList users={users} />
          <Pagination />
        </section>
      </main>
    </Layout>
  )
}

export default adminProtected(Users)
