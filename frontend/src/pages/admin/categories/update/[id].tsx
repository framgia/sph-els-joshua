import tw from 'twin.macro'
import { NextPage } from 'next'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'

import axios from '~/lib/axios'
import { toast } from 'react-toastify'
import { fetcher } from '~/lib/fetcher'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import Loading from '~/components/Loading'
import { ICategory } from '~/data/interfaces'
import { CategoryFormValues } from '~/data/types'
import { styles as global } from '~/twin/global.styles'
import { styles } from '~/twin/admin.questions.create.styles'
import ValidationError from '~/components/user/ValidationError'

const CategoryUpdate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
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
        .then(async () => {
          await mutate('/api/categories')
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
      <main css={styles.main}>
        <section css={styles.section}>
          {!categoryData ? <Loading /> 
          : (
            <form css={global.form} onSubmit={handleSubmit(handleUpdate)}>
              <h1 css={global.form_title}>Update Category</h1>
              <ValidationError 
                className="mt-4" 
                error={formError} 
                setFormError={setFormError} 
              />
              <div>
                <label css={global.label}>
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  tabIndex={1}
                  placeholder="Title" 
                  disabled={isSubmitting}
                  css={global.form_control}
                  defaultValue={categoryData?.title}
                  {...register('title', { required: 'Title is required' })}
                />
                {errors?.title && <span className="error">{`${errors?.title?.message}`}</span>}
              </div>
              <div>
                <label css={global.label}>Description <span className="text-red-500">*</span></label>
                <textarea 
                  rows={8} 
                  tabIndex={2}
                  disabled={isSubmitting}
                  css={global.form_control}
                  placeholder="Description"
                  defaultValue={categoryData?.description}
                  {...register('description', { required: 'Description is required' })}
                >
                </textarea>
                {errors?.description && <span className="error">{`${errors?.description?.message}`}</span>}
              </div>
              <div css={tw`flex justify-end`}>
                <button 
                  type="submit" 
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
