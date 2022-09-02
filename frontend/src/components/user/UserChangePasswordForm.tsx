import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { IUser } from '~/data/interfaces'
import { Spinner } from '~/utils/Spinner'
import ValidationError from './ValidationError'
import { UserChangePasswordFormValues } from '~/data/types'

type Props = {
  user: IUser
}

const UserChangePasswordForm: React.FC<Props> = ({ user }) => {
  const [formError, setFormError]: any = useState()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<UserChangePasswordFormValues>()

  const handleUpdate = async (data: UserChangePasswordFormValues): Promise<void> => {
    await 
      axios
        .patch(`/api/user-change-password/${user?.id}`, data)         
        .then(async () => {
          await 
            reset({ 
              current_password: '' ,
              new_password: '',
              confirm_password: ''
            })
            setFormError()
          toast.success('New Password Updated Successfully!')
        })
        .catch(error => {
          if (error.response.status !== 422) throw error
          setFormError(Object.values(error?.response?.data?.message).flat())
        })
  }

  return (
    <form 
      className="space-y-6" 
      onSubmit={handleSubmit(handleUpdate)}
    >
      <ValidationError className="mb-4" error={formError} setFormError={setFormError} />
      <div>
        <label className="form-label">Current password *</label>
        <input 
          type="password" 
          className="form-control" 
          disabled={isSubmitting}
          {...register('current_password', { required: 'Current password is required' })}
        />
        {errors?.current_password && <span className="error">{`${errors?.current_password?.message}`}</span>}
      </div>
      <div>
        <label className="form-label">New password *</label>
        <input 
          type="password" 
          className="form-control" 
          disabled={isSubmitting}
          {...register('new_password', { required: 'New password is required' })}
        />
        {errors?.new_password && <span className="error">{`${errors?.new_password?.message}`}</span>}
      </div>
      <div>
        <label className="form-label">Confirm password *</label>
        <input 
          type="password" 
          className="form-control" 
          disabled={isSubmitting}
          {...register('confirm_password', { required: 'Confirm password is required' })}
        />
        {errors?.confirm_password && <span className="error">{`${errors?.confirm_password?.message}`}</span>}
      </div>
      <button 
        type="submit" 
        className="btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner className="w-6 h-6" />
        ) : 'Change password'}
      </button>
    </form>
  )
}

export default UserChangePasswordForm
