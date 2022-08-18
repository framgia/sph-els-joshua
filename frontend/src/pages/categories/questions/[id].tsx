import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'

import axios from '~/lib/axios'
import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { authProtected } from '~/utils/auth-protected'
import { ICategoryQuestion, IChoice } from '~/data/interfaces'
import { convertIndexToAlphabet } from '~/helpers/convertIndexToAlphabet'

const CategoryQuestions: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { user: author } = useAuth({
    middlware: 'auth'
  })

  const { id } = router.query
  
  const [categoryQuestions, setCategoryQuestions]: any[] = useState()
  
  useEffect(() => {
    const getCategoryQuestionsById = async () => {
      const { data } = await fetcher(`/api/category-privilege/${id}`)
      setCategoryQuestions(data)
    }
    getCategoryQuestionsById()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handleSave = async (data: any): Promise<void> => {
    const message = confirm('Are you sure you want to your answer?')
      if (message) {

        const lessons = {
          user_id: author?.id,
          category_id: id
        }

        const answers = {
          rightAnswer: data?.right_answer,
          yourAnswer: data?.your_answer
        }

        await 
          axios
            .post('/api/lessons', { lessons, answers })
            .then(async (res) => {
              const result_id = await res?.data?.lessons?.id
              toast.success('You successfully submitted your answer!')
              router.push(`/results/${result_id}`)
            })
      }
  }

  return (
    <Layout metaTitle={categoryQuestions?.title}>
      <div className="border-b pb-3">
        <h1 className="text-xl font-semibold">{categoryQuestions?.title}</h1>
      </div>
      <div className="pt-5 pb-4">
        {!categoryQuestions ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-orange-500" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="divide-y">
                {categoryQuestions?.questions.map((question: ICategoryQuestion, i: number) => (
                  <div key={i} className="flex flex-col pb-10 pt-4">
                    <div className="inline-flex">
                      <div className="w-1/2 flex flex-col">
                        <label className="text-base font-semibold">{i+1}. {question?.value}</label>
                        <input 
                          type="hidden" 
                          value={question?.choice_id}
                          {...register(`right_answer[${i}]`)}
                        />
                      </div>
                      <div className="w-1/2 space-y-4">
                        <label className="text-base font-semibold">Choices</label>
                        {question?.choices?.map((choice: IChoice, idx: number) => (
                          <div key={idx} className="flex space-x-2 items-center">
                            <span>{convertIndexToAlphabet(idx+1) + ". "}</span>
                            <div className="flex items-center">
                              <input 
                                required
                                type="radio" 
                                value={idx+1} 
                                {...register(`your_answer[${question?.id}]`)}
                                className="form-radio-button" 
                                disabled={isSubmitting}
                              />
                              <label className="ml-2 text-sm font-medium">
                                {choice?.value}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <Spinner className="w-6 h-6" />
                    ) : 'Submit Answer'}
                  </button>
                </div>
              </div>
            </form>
          )}
      </div>
    </Layout>
  )
}

export default authProtected(CategoryQuestions)
