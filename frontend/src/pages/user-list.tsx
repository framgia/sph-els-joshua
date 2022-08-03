import React from 'react'

import { users } from '~/data/userList'
import Layout from '~/layouts/userLayout'
import UserAccountList from '~/components/user/UserAccountList'

const UserList = (): JSX.Element => {
  return (
    <Layout metaTitle="Accounts">
      <UserAccountList users={users} />
    </Layout>
  )
}


export default UserList
