import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Layout from '~/layouts/adminLayout'
import { ICategory } from '~/data/interfaces'
import { categories } from '~/data/categories'
import { classNames } from '~/utils/classNames'
import { CategoryFormValues } from '~/data/types'

const CategoryUpdate = () => {
  const router = useRouter()
  const [categoryData, setCategoryData] = useState<ICategory>()

  const { id } = router.query

  useEffect(() => {
    const getCategoryDataById = () => {
      const newCategories = categories?.find((cat) => cat?.id?.toString() == id)
      setCategoryData(newCategories)
    }
    getCategoryDataById()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CategoryFormValues>()

  const handleUpdate = (data: CategoryFormValues) => {
    alert('Good')
  }

  return (
    <Layout metaTitle="Category Update">
      <main className="pt-4 px-4">
        <section className={classNames(
          'overflow-x-auto relative rounded-2xl shadow-md bg-white',
          'max-w-lg mx-auto border'
        )}>
          <form className="p-10" onSubmit={handleSubmit(handleUpdate)}>
            <h1 className="form-title">Update Category</h1>
            <div className="mt-5">
              <label className="form-label">Title *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Title" 
                {...register('title', { required: 'Title is required' })}
                tabIndex={1}
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
                defaultValue={categoryData?.description}
              >
              </textarea>
              {errors?.description && <span className="error">{`${errors?.description?.message}`}</span>}
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                type="submit" 
                tabIndex={3}
                className="btn-success px-10 py-3"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default CategoryUpdate
