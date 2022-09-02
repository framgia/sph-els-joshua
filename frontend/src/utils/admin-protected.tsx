import React from 'react'

import { useAuth } from '~/hooks/auth'
import UnAuthorized from './unauthorized'

export const adminProtected = (Comp: any) => {
  return function AuthProtected(props: any) {

    const { user } = useAuth({
      middleware: 'admin',
      redirectIfAuthenticated: '/admin/users'
    })
    
    if (!user?.is_admin) return <UnAuthorized message="You are not authorized to access this page!" />

    return <Comp {...props} />
  }
}
