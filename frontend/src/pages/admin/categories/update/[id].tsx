import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'

import axios from '~/lib/axios'
import { toast } from 'react-toastify'
import { fetcher } from '~/lib/fetcher'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import { ICategory } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'
import { CategoryFormValues } from '~/data/types'
import ValidationError from '~/components/user/ValidationError'

const CategoryUpdate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [formError, setFormError]: any = useState()
  const [categoryData, setCategoryData] = useState<ICategory>()

  const { id } = router.query
  
  useEffect(() => {
    const getCategoryDataById = async () => {
      const newCategory = await fetcher(`/api/categories/${id}`)
      setCategoryData(newCategory?.data)
    }
    getCategoryDataById()
  }, [id])
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CategoryFormValues>({
    mode: 'onChange',
    defaultValues: {
      title: categoryData?.title,
      description: categoryData?.description
    }
  })
  
  const handleUpdate = async (data: CategoryFormValues) => {
    await 
      axios
        .patch(`/api/categories/${id}`, data)
        .then(() => {
          toast.success('Updated Category Successfully!')
          router.push('/admin/categories')
        })
        .catch(error => {
          if (error.response.status !== 422) throw EvalError
          setFormError(Object.values(error?.response?.data?.error).flat())
        })
  }

  return (
    <Layout metaTitle="Category Update">
      <main className="pt-4 px-4">
        <section className={classNames(
          'overflow-x-auto relative rounded-2xl shadow-md bg-white',
          'max-w-lg mx-auto border'
        )}>
          {!categoryData ? (
            <div className="py-5 flex flex-col justify-center items-center">
              <Spinner className="w-6 h-6" />
              <p className="mt-2 text-xs">Loading...</p>
            </div>
          ) : (
            <form className="p-10" onSubmit={handleSubmit(handleUpdate)}>
              <h1 className="form-title">Update Category</h1>
              <ValidationError className="mt-4" error={formError} setFormError={setFormError} />
              <div className="mt-5">
                <label className="form-label">Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Title" 
                  {...register('title', { required: 'Title is required' })}
                  tabIndex={1}
                  disabled={isSubmitting}
                  defaultValue={categoryData?.title}
                />
                {errors?.title && <span className="error">{`${errors?.title?.message}`}</span>}
              </div>
              <div className="mt-5">
                <label className="form-label">Description *</label>
                <textarea 
                  rows={8} 
                  className="form-control" 
                  placeholder="Description"
                  {...register('description', { required: 'Description is required' })}
                  tabIndex={2}
                  disabled={isSubmitting}
                  defaultValue={categoryData?.description}
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
          )}
        </section>
      </main>
    </Layout>
  )
}

export default CategoryUpdate
