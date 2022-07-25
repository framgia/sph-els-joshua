import React from 'react'
import Head from 'next/head'
import { useAuth } from '~/hooks/auth'
import { authProtected } from '~/utils/auth-protected'

const Home = () => {
  const { logout, user } = useAuth({
    middleware: 'auth'
  })

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="max-w-6xl mx-auto mt-10 ">
        <p className="text-blue-500 text-2xl">Welcome {user?.name} You are now authenticated</p>
        <button 
          className="px-3 text-sm py-1 rounded-full bg-blue-500 text-white font-semibold"
          onClick={logout}
        >Logout</button>
      </main>
    </>
  )
}

export default authProtected(Home)
