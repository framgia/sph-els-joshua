import useSWR from 'swr'
import axios from '~/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type ParamProps = { 
  name?: string
  email?: string
  password?: string
  setErrors?: any
  setStatus?: any 
}

export const useAuth = (props: any) => {
  const { middleware, redirectIfAuthenticated } = {} = props
  const router = useRouter()

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then((res: any) => res.data)
      .catch((error: any) => {
        if (error.response.status !== 409) throw error
        router.push('/verify-email')
      }),
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }: ParamProps) => {
    await csrf()

    setErrors([])

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const login = async ({ setErrors, setStatus, ...props }: ParamProps) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }: ParamProps) => {
    await csrf()

    setErrors([])
    setStatus(null)

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
        .then(() => mutate())
    }

    window.location.pathname = '/login'
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
  }
}
