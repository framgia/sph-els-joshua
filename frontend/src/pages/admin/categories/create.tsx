import tw from 'twin.macro'
import { NextPage } from 'next'
import { useSWRConfig } from 'swr'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { styles as global } from '~/twin/global.styles'

import axios from '~/lib/axios'
import { toast } from 'react-toastify'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import { CategoryFormValues } from '~/data/types'
import { styles } from '~/twin/admin.questions.create.styles'
import AuthValidationErrors from '~/components/AuthValidationErrors'

const CategoryCreate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
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
        .then(async () => {
          await mutate('/api/categories')
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
      <main css={styles.main}>
        <section css={styles.section}>
          <form css={global.form} onSubmit={handleSubmit(handleSave)}>
            <h1 css={global.form_title}>Create Category</h1>
            <AuthValidationErrors 
              className="mt-4" 
              errors={formErrors} 
              setErrors={setFormErrors} 
            />
            <div>
              <label css={global.label}>Title *</label>
              <input 
                type="text" 
                tabIndex={1}
                placeholder="Title" 
                disabled={isSubmitting}
                css={global.form_control}
                {...register('title', { required: 'Title is required' })}
              />
              {errors?.title && <span className="error">{`${errors?.title?.message}`}</span>}
            </div>
            <div>
              <label css={global.label}>Description *</label>
              <textarea 
                rows={8} 
                tabIndex={2}
                disabled={isSubmitting}
                css={global.form_control}
                placeholder="Description"
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
        </section>
      </main>
    </Layout>
  )
}

export default CategoryCreate
