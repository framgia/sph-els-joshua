import useSWR from 'swr'
import { useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import axios from '~/lib/axios'

type ParamProps = { 
  name?: string
  email?: string
  password?: string
  setErrors?: any
  setStatus?: any 
}

export const useAuth = (props: any) => {
  const router = useRouter()
  const { middleware, redirectIfAuthenticated } = {} = props

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then((res: AxiosResponse) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw console.log(error?.response?.statusText)
        router.push('/verify-email')
      }), {
        refreshInterval: 1000,
        revalidateOnMount: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }: ParamProps) => {
    await csrf()

    setErrors([])

    await 
      axios
        .post('/register', props)
        .then(async () => {
          await mutate()
          toast.success('Successfully Register!')
        })
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(Object.values(error?.response?.data?.errors).flat())
        })
  }

  const login = async ({ setErrors, ...props }: ParamProps) => {
    await csrf()

    setErrors([])

    await
      axios
        .post('/login', props)
        .then(async () => await mutate())
        .catch(error => {
          if (error.response.status !== 422) throw error

          setErrors(Object.values(error.response.data.errors).flat())
        })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }: ParamProps) => {
    await csrf()

    setErrors([])
    setStatus(null)

    await 
      axios
        .post('/forgot-password', { email })
        .then(response => setStatus(response.data.status))
        .catch(error => {
            if (error.response.status !== 422) throw error

            setErrors(Object.values(error.response.data.errors).flat())
        })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }: ParamProps) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/reset-password', { token: router.query.token, ...props })
      .then(response => router.push('/login?reset=' + btoa(response.data.status)))
      .catch(error => {
          if (error.response.status !== 422) throw error
          
          setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resendEmailVerification = ({ setStatus }: ParamProps) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (! error) {
      await axios
        .post('/logout')
        .then(async () => await mutate())
    }

    if (router.pathname.includes('/admin'))
      window.location.pathname = '/admin'
    else 
      window.location.pathname = '/'
  }

  useEffect(() => {
      if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
      if (middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    middleware
  }
}
