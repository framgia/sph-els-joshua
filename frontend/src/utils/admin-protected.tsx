import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useAuth } from '~/hooks/auth'
import { Spinner } from '~/utils/Spinner'

export const adminProtected = (Comp: any) => {
  return function AuthProtected(props: any) {
    const router = useRouter()

    const { user: admin, logout } = useAuth({
      middleware: 'admin',
      redirectIfAuthenticated: '/admin/users'
    })

    {/**
      * This will check "is_admin" column
      * if it is equal to 0 which is false
      * it will show the unauthorized message
      * and will logout automatically redirect 
      * to /admin route
    */}
    useEffect(() => {
      const isAuthenticatedAdmin = async () => {
        if (!admin) router.push('/admin')
        if (admin?.is_admin === 0) await logout()
      }
      isAuthenticatedAdmin()
    }, [admin])
    
    if (admin?.is_admin === 0) return (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-screen">
        <p className="text-xl font-bold text-red-500 uppercase">You are unauthorized to access this page.</p>
        <Spinner className="w-8 h-8 text-red-500 stroke-2" />
      </div>
    )

    return <Comp {...props} />
  }
}
