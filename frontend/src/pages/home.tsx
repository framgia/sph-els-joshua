import React from 'react'
import Head from 'next/head'
import { useAuth } from '~/hooks/auth'



const Home = () => {
  const { logout } = useAuth({
    middleware: 'auth'
  })

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <main className="max-w-6xl mx-auto mt-10 ">
        <p className="text-blue-500 text-2xl">Welcome Home You are now authenticated</p>
        <button className="px-3 text-sm py-1 rounded-full bg-blue-500 text-white font-semibold">Logout</button>
      </main>
    </React.Fragment>
  )
}

export default Home