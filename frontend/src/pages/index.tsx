import tw from 'twin.macro'
import Head from 'next/head'
import type { NextPage } from 'next'
import React, { useState } from 'react'

import { useAuth } from '~/hooks/auth'
import { styles } from '~/twin/index.styles'
import { SignInUpFormValues } from '~/data/types'
import SignInUpForm from '~/components/user/SignInUpForm'
import AuthValidationErrors from '~/components/AuthValidationErrors'

const Index: NextPage = (): JSX.Element => {
  const [errors, setErrors] = useState([])
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true)

  const { login, register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const handleSwitchForm = (): void => setIsLoginPage(!isLoginPage)

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    const { name, email, password } = data

    if (isLoginPage) {
      await login({ email, password, setErrors })
    } else {
      await register({ name, email, password, setErrors })
    }
  }

  const title = isLoginPage ? 'Sign in' : 'Sign up'

  return (
    <>
      <Head>
        <title>{`ELearning | ${title}`}</title>
      </Head>
      <section css={styles.wrapper}>
        <div css={styles.banner}>
          <div css={styles.banner_filter}></div>
          <div css={styles.banner_text}>
            <div>
              <h2>Sun* ELearning App</h2>
              <p>
                Where everything can be learn by yourself
              </p>
            </div>
          </div>
        </div>
        <div css={styles.auth_form}>
          <div>
            <div css={tw`text-center`}>
              <h2 css={styles.auth_form_h2}>
                {isLoginPage ? 'Sign In' : 'Sign Up'}
              </h2>
              <p css={styles.auth_form_p}>Welcome to eLearning App</p>
            </div>
            <div css={tw`mt-8`}>
              <AuthValidationErrors 
                className="mb-4" 
                errors={errors} 
                setErrors={setErrors} 
              />
              <SignInUpForm 
                isLoginPage={isLoginPage}
                actions={{ handleSwitchForm, handleAuthSubmit }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
