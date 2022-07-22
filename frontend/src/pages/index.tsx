import Head from 'next/head'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import { classNames } from '~/utils/classNames'
import SignInUpForm from '~/components/user/SignInUpForm'

const Index: NextPage = (): JSX.Element => {
  let [isLoginPage, setIsLoginPage] = useState<boolean>(true)

  const handleSwitchForm = (): void => setIsLoginPage((isLoginPage = !isLoginPage))

  const handleAuthSubmit = (): void => {
    if (isLoginPage) {
      alert('Logged In')
    } else {
      alert('Good Registered')
    }
  }

  return (
    <div>
      <Head>
        <title>ELearning | {isLoginPage ? 'Sign in' : 'Sign up'}</title>
      </Head>
      <div className="bg-white flex justify-center h-screen">
        <div
          className={classNames(
            'relative hidden bg-cover lg:block lg:w-2/3',
            'bg-[url(/img/1.jpg)]'
          )}
        >
          <div className="absolute bg-black opacity-10 inset-0"></div>
          <div className="flex items-center h-full px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">ELearning Sun* App</h2>
              <p className="max-w-xl mt-3 text-gray-900 text-lg">
                Where everything can be learn by yourself
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700">
                {isLoginPage ? 'Sign In' : 'Sign Up'}
              </h2>
              <p className="mt-3 text-gray-500">Welcome to eLearning App</p>
            </div>

            <div className="mt-8">
              <SignInUpForm 
                isLoginPage={isLoginPage}
                actions={{ handleSwitchForm, handleAuthSubmit }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
