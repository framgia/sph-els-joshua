import useSWR from 'swr'
import tw from 'twin.macro'
import { NextPage } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { fetcher } from '~/lib/fetcher'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import Loading from '~/components/Loading'
import { QuestionFormValues } from '~/data/types'
import { ICategory, IChoice } from '~/data/interfaces'
import { styles as global } from '~/twin/global.styles'
import ChooseFields from '~/components/admin/ChooseFields'
import { styles } from '~/twin/admin.questions.create.styles'
import AuthValidationErrors from '~/components/AuthValidationErrors'

const QuestionCreate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [formErrors, setFormErrors]: any[] = useState([])

  const { data: categories, mutate } = useSWR('/api/categories', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  /**
    * This will partially save your choices data
   */
  const [choices, setChoices] = useState<IChoice[]>([
    {
      id: uuidv4(),
      value: '',
      is_correct: false
    }
  ])
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<QuestionFormValues>()


  /**
    * This will handle dynamic input field
   */
  const handleChangeInput = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputFields = choices.map((i: any) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })
    setChoices(newInputFields)
  }

  /**
    * This will remove dynamic choice field
   */
  const handleRemoveField = (id: string): void => {
    const values = [...choices]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setChoices(values)
  }

  /**
    * This will add dynamic choice field
   */
  const handleAddField = (): void => setChoices([...choices, { id: uuidv4(), value: '', is_correct: false }])

    /**
    * This will Save all the data seelcted
   */
  const handleSave = async (data: QuestionFormValues): Promise<void> => {
    const { category_id, value, choice_id } = data

    const newChoices = choices.map((choice, i) => {
      return {
        ...choice,
        is_correct: (i+1) == choice_id
      }
    })

    await 
      axios
        .post('/api/questions', {
          category_id,
          value,
          choices: newChoices
        })
        .then(async () => {
          await mutate()
          toast.success('Added Question Successfully!')
          router.push('/admin/questions')
        })
        .catch(error => {
          if (error.response.status !== 422) throw error
          setFormErrors(Object.values(error?.response?.data?.errors).flat())
        })
  }

  return (
    <Layout metaTitle="Questions">
      <main css={styles.main}>
        <section css={styles.section}>
          {!categories ? <Loading /> 
          : (
            <form 
              css={global.form}
              onSubmit={handleSubmit(handleSave)}
            >
              <h1 css={global.form_title}>Add Question</h1>
              <AuthValidationErrors 
                className="mt-4" 
                errors={formErrors} 
                setErrors={setFormErrors} 
              />
              <div>
                <label css={global.label}>Categories *</label>
                <select 
                  css={global.form_control}
                  tabIndex={1}
                  disabled={isSubmitting}
                  {...register('category_id', { required: 'Category is required' })}
                >
                {categories?.data?.map(({ id, title }: ICategory) => <option key={id} value={id}>{title}</option>)}
                </select>
                {errors?.category_id && <span className="error">{`${errors?.category_id?.message}`}</span>}
              </div>
              <div>
                <label css={global.label}>Question *</label>
                <input 
                  type="text" 
                  css={global.form_control}
                  placeholder="Write your question"
                  tabIndex={2}
                  disabled={isSubmitting}
                  {...register('value', { required: 'Question is required' })}
                />
                {errors?.value && <span className="error">{`${errors?.value?.message}`}</span>}
              </div>
              <div>
                <label css={global.label}>Answer *</label>
                <select 
                  css={global.form_control}
                  tabIndex={1}
                  disabled={isSubmitting}
                  {...register('choice_id', { required: 'Right Answer is required'})}
                >
                {choices?.map(({ id, value }: IChoice, i: number) => <option key={id} value={i+1}>{value}</option>)}
                </select>
                {errors?.choice_id && <span className="error">{`${errors?.choice_id?.message}`}</span>}
              </div>
              <div>
                <label css={global.label}>Choices *</label>
                <ChooseFields
                  choices={choices}
                  actions={{ 
                    handleAddField,
                    handleChangeInput, 
                    handleRemoveField, 
                  }}
                  isSubmitting={isSubmitting}
                />
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

export default QuestionCreate
