import { useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const authProtected = (Comp: any) => {
  return function AuthProtected(props: any) {
    const router = useRouter()

    const { user } = useAuth({
      middleware: 'auth'
    })

    useEffect(() => {
      const isAuthenticated = async () => !user && await router.push('/')
      isAuthenticated()
    }, [user])

    return <Comp {...props} />
  }
}