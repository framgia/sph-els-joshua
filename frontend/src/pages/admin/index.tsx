import Head from 'next/head'
import type { NextPage } from 'next'
import React, { useState } from 'react'

import { useAuth } from '~/hooks/auth'
import { classNames } from '~/helpers/classNames'
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
      <div className="bg-white flex justify-center h-screen">
        <div
          className={classNames(
            'relative hidden bg-cover lg:block lg:w-2/3',
            'bg-[url(/img/2.jpg)]'
          )}
        >
          <div className="absolute bg-black opacity-10 inset-0"></div>
          <div className="flex items-center h-full px-20">
            <div>
              <h2 className="text-5xl font-bold text-white">Sun* Administrator</h2>
              <p className="max-w-xl mt-3 text-white text-lg">
                Warning: Unauthorized Personnel are Strictly Prohibited
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700">Administrator</h2>
              <p className="mt-3 text-gray-500">only authorized personnel are allowed</p>
            </div>

            <div className="mt-8">
              <AuthValidationErrors className="mb-4" errors={errors} setErrors={setErrors} />
              <SignInUpForm 
                isLoginPage={isLoginPage}
                actions={{ handleSwitchForm, handleAuthSubmit }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
