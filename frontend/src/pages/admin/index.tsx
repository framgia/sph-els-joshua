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
  let [isLoginPage, setIsLoginPage] = useState<boolean>(true)

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/users',
  })

  const handleSwitchForm = (): void => setIsLoginPage((isLoginPage = !isLoginPage))

  const handleAuthSubmit = async ({ email, password }: SignInUpFormValues): Promise<void> => {
    if (isLoginPage) {
      await login({ email, password, setErrors })
    }
  }

  return (
    <>
      <Head>
        <title>{`ELearning Administrator`}</title>
      </Head>
      <section css={styles.wrapper}>
        <div css={styles.banner}>
          <div css={styles.banner_filter}></div>
          <div css={styles.banner_text}>
            <div>
              <h2 className="text-5xl font-bold text-white">Sun* Administrator</h2>
              <p className="max-w-xl mt-3 text-white text-lg">
                Warning: Unauthorized Personnel are Strictly Prohibited
              </p>
            </div>
          </div>
        </div>
        <div css={styles.auth_form}>
          <div>
            <div css={tw`text-center`}>
              <h2 css={styles.auth_form_h2}>Administrator</h2>
              <p css={styles.auth_form_p}>only authorized personnel are allowed</p>
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
