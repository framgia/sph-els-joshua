import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Spinner } from '~/utils/Spinner'

type FormValues  = {
  name: string
  email: string
  password: string
  setErrors?: React.Dispatch<React.SetStateAction<never[]>>
}

type Props = {
  isLoginPage: boolean
  actions: {
    handleSwitchForm: () => void
    handleAuthSubmit: (data: FormValues) => void
  }
}

const SignInUpForm: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const { isLoginPage, actions } = props
  const { handleSwitchForm, handleAuthSubmit } = actions

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<FormValues>()

  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)}>
      {!isLoginPage && (
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={isSubmitting}
            {...register('name', {
              required: 'Name is required',
              maxLength: {
                value: 30,
                message: 'Should have max length of 30 characters'
              },
              minLength: {
                value: 4,
                message: 'Shoud not less than 4 length characters'
              }
            })}
            tabIndex={1}
          />
          {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
        </div>
      )}
      <div className="mt-4">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          placeholder=""
          className="form-control"
          disabled={isSubmitting}
          tabIndex={2}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          placeholder=""
          className="form-control"
          disabled={isSubmitting}
          tabIndex={3}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Shoud not less than 4 character'
            }
          })}
        />
        {errors?.password && <span className="error">{`${errors?.password?.message}`}</span>}
      </div>
      {router.pathname !== '/admin' && (
        isLoginPage && (
          <a
            href="#"
            className="link mt-2 text-right"
          >
            Forgot your password?
          </a>
        )
      )}

      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-submit"
        >
          {isSubmitting ? (
            <Spinner className="w-6 h-6" />
          ) : isLoginPage ? 'Login' : 'Register'}
        </button>
        {router.pathname !== '/admin' && (
          <div>
            <a
              href="#"
              className="link mt-4 text-center"
              onClick={handleSwitchForm}
            >
              {!isLoginPage ? 'Do you have an account? Sign In' : "You don't have an account? Sign Up"}
            </a>
          </div>
        )}
      </div>
    </form>
  )
}

export default SignInUpForm
