import useSWR from 'swr'
import { NextPage } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { TiInfo } from 'react-icons/ti'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { GrFormSubtract } from 'react-icons/gr'
import React, { useEffect, useState } from 'react'

import axios from '~/lib/axios'
import { Spinner } from '~/utils/Spinner'
import Layout from '~/layouts/adminLayout'
import { classNames } from '~/utils/classNames'
import { QuestionFormValues } from '~/data/types'
import { ICategory, IChoice, IQuestion } from '~/data/interfaces'

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

const QuestionUpdate: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query
  
  const [formError, setFormError]: any = useState()

  const [category, setCategory] = useState<ICategory>()
  const [question, setQuestion] = useState<IQuestion>()
  const [choices, setChoices] = useState<IChoice[]>([])

  useEffect(() => {
    const getQuestionById = async () => {
      const { category, question } = await fetcher(`/api/questions/${id}`)
      setCategory(category)
      setQuestion(question)
      setChoices(question?.choices)
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
  const handleAddField = (): void => setChoices([...choices, { id: uuidv4(), value: '' }])

  const handleUpdate = async (data: QuestionFormValues): Promise<void> => {
    const { value, choice_id } = data
    await 
      axios
        .patch(`/api/questions/${id}`, {
          value,
          choice_id,
          choices
        })
        .then((res) => {
          console.log(res)
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
      <main className="pt-4 px-4">
        <section className={classNames(
          'overflow-x-auto relative rounded-2xl shadow-md bg-white',
          'max-w-lg mx-auto border'
        )}>
          {(!category && !question) ? (
            <div className="py-5 flex flex-col justify-center items-center">
              <Spinner className="w-6 h-6" />
              <p className="mt-2 text-xs">Loading...</p>
            </div>
          ) : (
            <form className="p-10" onSubmit={handleSubmit(handleUpdate)}>
              <h1 className="form-title">Update Question</h1>
              <div className="mt-3">
                <label className="form-label">Category *</label>
                <select 
                  className="form-control" 
                  tabIndex={1}
                  disabled={isSubmitting}
                  {...register('category_id', { required: 'Category is required' })}
                >
                  <option value={category?.id}>{category?.title}</option>
                </select>
                {errors?.category_id && <span className="error">{`${errors?.category_id?.message}`}</span>}
              </div>
              <div className="mt-6">
                <label className="form-label">Question *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Write your question"
                  tabIndex={2}
                  disabled={isSubmitting}
                  defaultValue={question?.value}
                  {...register('value', { required: 'Question is required' })}
                />
                {errors?.value && <span className="error">{`${errors?.value?.message}`}</span>}
              </div>
              <div className="mt-3">
                <label className="form-label">Answer *</label>
                <select 
                  className="form-control" 
                  tabIndex={1}
                  disabled={isSubmitting}
                  {...register('choice_id', { required: 'Right Answer is required'})}
                >
                {choices?.map(({ id, value }: IChoice, i: number) => 
                  <option key={id} value={i+1} selected={question?.choice_id == i+1}>{value}</option>
                )}
                </select>
                {errors?.choice_id && <span className="error">{`${errors?.choice_id?.message}`}</span>}
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="form-label">Choices *</label>
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

type ChooseProps = {
  choices: any
  actions: {
    handleChangeInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void
    handleAddField: () => void
    handleRemoveField: (id: string) => void
  }
  isSubmitting: boolean
}

const ChooseFields: React.FC<ChooseProps> = (props): JSX.Element => {
  const { choices, actions, isSubmitting } = props
  const {handleChangeInput, handleAddField, handleRemoveField } = actions

  const convertIndexToAlphabet = (num: number): string | undefined => {
    let columnLetter = '',
    t;
    while (num > 0) {
      t = (num - 1) % 26;
      columnLetter = String.fromCharCode(65 + t) + columnLetter;
      num = (num - t) / 26 | 0;
    }
    return columnLetter || undefined;
  }

  return choices?.map((choice: IChoice, i: number) => (
    <div
      key={choice?.id}
      className="flex items-center space-x-1 space-y-2">
      <div className="relative flex items-center flex-1">
        <div className="absolute flex items-center px-4 pt-2">
          <span className="font-bold text-green-500 pr-3 border-r">{convertIndexToAlphabet(i+1)}</span>
        </div>
        <input
          type="text"
          name="value"
          required
          disabled={isSubmitting}
          value={choice?.value}
          onChange={(event) => handleChangeInput(choice?.id, event)}
          className="form-control pl-12"
        />
      </div>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button 
          type="button" 
          className="btn-default rounded-l-sm"
          onClick={() => handleRemoveField(choice?.id)}
          disabled={choices?.length === 1 || isSubmitting}
        >
          <GrFormSubtract className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          type="button" 
          className="btn-default rounded-r-sm"
          onClick={handleAddField}
          disabled={choices?.length >= 7 || isSubmitting}
        >
          <FiPlus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  ))
}

export default QuestionUpdate
