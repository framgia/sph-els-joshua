import React from 'react'
import { NextPage } from 'next'
import { useAuth } from '~/hooks/auth'
import Layout from '~/layouts/adminLayout'
import { adminProtected } from '~/utils/admin-protected'

const Users: NextPage = () => {
  const { logout, user } = useAuth({
    middleware: 'admin',
    redirectIfAuthenticated: '/admin'
  })

  return (
    <Layout metaTitle="Users">
      <main className="max-w-6xl mx-auto mt-10 ">
        <p className="text-blue-500 text-2xl">Welcome {user?.name} You are now authenticated</p>
        <p className="text-blue-500 text-2xl">Role: {user?.is_admin === 1 ? 'admin' : 'user'} </p>
        <p className="text-blue-500 text-2xl">ID: {user?.id} </p>
        <button 
          className="px-3 text-sm py-1 rounded-full bg-blue-500 text-white font-semibold"
          onClick={logout}
        >Logout</button>
      </main>
    </Layout>
  )
}

export default adminProtected(Users)
