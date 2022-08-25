import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useAuth } from '~/hooks/auth'
import UnAuthorized from './unauthorized'

export const adminProtected = (Comp: any) => {
  return function AuthProtected(props: any) {
    const router = useRouter()

    const { user: admin, logout } = useAuth({
      middleware: 'admin',
      redirectIfAuthenticated: '/admin/users'
    })

    {/**
      * This will check "is_admin" column
      * if it is equal to true it will 
      * show the unauthorized message
      * and will logout automatically redirect 
      * to /admin route
    */}
    useEffect(() => {
      const isAuthenticatedAdmin = async () => {
        if (!admin) router.push('/admin')
        if (!admin?.is_admin) await logout()
      }
      isAuthenticatedAdmin()
    }, [admin])
    
    if (!admin?.is_admin) return <UnAuthorized message="You are not authorized to access this page!" />

    return <Comp {...props} />
  }
}
