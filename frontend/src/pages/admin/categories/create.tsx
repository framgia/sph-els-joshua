import { NextPage } from 'next'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { toast } from 'react-toastify'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import { classNames } from '~/helpers/classNames'
import { CategoryFormValues } from '~/data/types'
import AuthValidationErrors from '~/components/AuthValidationErrors'

const CategoryCreate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [formErrors, setFormErrors]: any[] = useState([])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CategoryFormValues>()

  const handleSave = async (data: CategoryFormValues): Promise<void> => {
    await 
      axios
        .post('/api/categories', data)
        .then(() => {
          toast.success('Added Category Successfully!')
          router.push('/admin/categories')
        })
        .catch(error => {
          if (error.response.status !== 422) throw error
          setFormErrors(Object.values(error?.response?.data?.errors).flat())
        })
  }

  return (
    <Layout metaTitle="Category Create">
      <main className="pt-4 px-4">
        <section className={classNames(
          'overflow-x-auto relative rounded-2xl shadow-md bg-white',
          'max-w-lg mx-auto border'
        )}>
          <form className="p-10" onSubmit={handleSubmit(handleSave)}>
            <h1 className="form-title">Create Category</h1>
            <AuthValidationErrors className="mt-4" errors={formErrors} setErrors={setFormErrors} />
            <div className="mt-5">
              <label className="form-label">Title *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Title" 
                disabled={isSubmitting}
                {...register('title', { required: 'Title is required' })}
                tabIndex={1}
              />
              {errors?.title && <span className="error">{`${errors?.title?.message}`}</span>}
            </div>
            <div className="mt-5">
              <label className="form-label">Description *</label>
              <textarea 
                rows={8} 
                className="form-control" 
                placeholder="Description"
                disabled={isSubmitting}
                {...register('description', { required: 'Description is required' })}
                tabIndex={2}
              >
              </textarea>
              {errors?.description && <span className="error">{`${errors?.description?.message}`}</span>}
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                type="submit" 
                tabIndex={3}
                disabled={isSubmitting}
                className="btn-success px-10 py-3"
              >
                {isSubmitting ? (
                  <Spinner className="w-5 h-5" />
                ) : 'Save'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default CategoryCreate
