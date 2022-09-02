import tw from 'twin.macro'
import { NextPage } from 'next'
import { useSWRConfig } from 'swr'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'

import axios from '~/lib/axios'
import { fetcher } from '~/lib/fetcher'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import Loading from '~/components/Loading'
import { QuestionFormValues } from '~/data/types'
import { styles as global } from '~/twin/global.styles'
import ChooseFields from '~/components/admin/ChooseFields'
import { styles } from '~/twin/admin.questions.create.styles'
import { ICategory, IChoice, IQuestion } from '~/data/interfaces'

const QuestionUpdate: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const { id } = router.query
  
  const [formError, setFormError]: any = useState()

  const [category, setCategory] = useState<ICategory>()
  const [question, setQuestion] = useState<IQuestion>()
  const [choices, setChoices] = useState<IChoice[]>([])
  const [selectedChoice, setSelectedChoice] = useState<any>(0)

  useEffect(() => {
    const getQuestionById = async () => {
      const { data } = await fetcher(`/api/questions/${id}`)
      setCategory(data?.category)
      setQuestion(data?.question)
      setChoices(data?.choices)
    }
    getQuestionById()
  }, [id])
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<QuestionFormValues>({
    mode: 'onChange',
    defaultValues: {
      category_id: question?.category_id,
      choice_id: question?.choice_id,
      value: question?.value
    }
  })

  /**
    * This will handle dynamic input field
    */
  const handleChangeInput = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputFields = choices?.map((i: any) => {
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

  const handleUpdate = async (data: QuestionFormValues): Promise<void> => {
    const { value } = data

    const newChoices = choices.map((choice, i) => {
      return {
        ...choice,
        is_correct: (i+1) === parseInt(selectedChoice)
      }
    })

    await 
      axios
        .put(`/api/questions/${id}`, {
          value,
          choices: newChoices
        })
        .then(async () => {
          await mutate('/api/questions')
          toast.success('Updated Category Successfully!')
          router.push('/admin/questions')
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
          {(!category && !question) ? <Loading />  
          : (
            <form css={global.form} onSubmit={handleSubmit(handleUpdate)}>
              <h1 css={global.form_title}>Update Question</h1>
              <div>
                <label css={global.label}>Category *</label>
                <select 
                  css={global.form_control} 
                  tabIndex={1}
                  disabled={isSubmitting}
                  {...register('category_id', { required: 'Category is required' })}
                >
                  <option value={category?.id}>{category?.title}</option>
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
                  defaultValue={question?.value}
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
                  onChange={(e) => setSelectedChoice(e.target.value)}
                >
                {choices?.map(({ id, value, is_correct }: IChoice, i: number) => 
                  <option key={id} value={i+1} selected={is_correct}>{value}</option>
                )}
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

export default QuestionUpdate
