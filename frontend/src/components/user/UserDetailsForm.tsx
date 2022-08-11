import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { IUser } from '~/data/interfaces'
import { Spinner } from '~/utils/Spinner'
import ValidationError from './ValidationError'
import { UserDetailsFormValues } from '~/data/types'

type Props = {
  user: IUser
}

const UserDetailsForm: React.FC<Props> = ({ user }): JSX.Element => {
  const [formError, setFormError]: any = useState()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<UserDetailsFormValues>()

  const handleUpdate = async (data: UserDetailsFormValues): Promise<void> => {
    await 
      axios
        .patch(`/api/user-privilege/${user?.id}`, data)
        .then(() => toast.success('Your Details Updated Successfully!'))
        .catch(error => {
          if (error.response.status !== 422) throw EvalError
          setFormError(Object.values(error?.response?.data?.error).flat())
        })
  }

  return (
    <form 
      className="space-y-6" 
      onSubmit={handleSubmit(handleUpdate)}
    >
      <ValidationError className="mt-4" error={formError} setFormError={setFormError} />
      <div>
        <label className="form-label">Your name</label>
        <input 
          type="text" 
          className="form-control" 
          defaultValue={user?.name}
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
        />
        {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
      </div>
      <div>
        <label className="form-label">Your email</label>
        <input 
          type="email" 
          className="form-control" 
          defaultValue={user?.email}
          disabled={isSubmitting}
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
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary"
      >
        {isSubmitting ? (
          <Spinner className="w-6 h-6" />
        ) : 'Save Changes'}
      </button>
    </form>
  )
}

export default UserDetailsForm
