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

type IHandleChange = {
  question_id: number | undefined
  choice_id?: number
  is_correct: boolean
}

const CategoryQuestions: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [tempData, setTempData] = useState<IHandleChange[]>([])

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

        await 
          axios
            .post('/api/lessons', { 
              lessons, 
              answers: tempData
            })
            .then(async (res) => {
              const lesson_id = await res?.data?.lesson_id
              toast.success(res?.data?.message)
              router.push(`/results/${lesson_id}`)
            })
      }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, props: any): void => {
    const { choice_id, question_id, is_correct, questionIdx } = props

    const newTempData = tempData.map((item, idx) => {
      if (idx === questionIdx) {
        return {
          question_id,
          choice_id,
          is_correct
        }
      }
      return item
    })
    
    setTempData(newTempData)
  }

  useEffect(() => {
    if (categoryQuestions) {
      const newData = categoryQuestions.questions?.map(() => {
        return {
          question_id: null,
          choice_id: null,
          is_correct: null
        }
      })
      setTempData(newData)
    }
  }, [categoryQuestions])

  return (
    <Layout metaTitle={categoryQuestions?.title}>
      {!categoryQuestions ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-red-500" />
          </div>
        ) : (
          <>
            <div className="pt-5 pb-4 bg-white rounded-md shadow-primary">
              <h1 className="text-2xl font-bold text-red-500 text-center">"{categoryQuestions?.title}"</h1>
            </div>
            <form onSubmit={handleSubmit(handleSave)} className="mt-4 bg-white px-8 py-4 rounded-md shadow-primary">
              <div className="divide-y divide-gray-100">
                {categoryQuestions?.questions.map((question: ICategoryQuestion, questionIdx: number) => (
                  <div key={questionIdx} className="flex flex-col pb-10 pt-4">
                    <div className="flex items-start flex-col md:flex-row">
                      <div className="md:w-1/2 flex flex-col">
                        <label className="text-lg font-semibold">{questionIdx+1}. {question?.value}</label>
                      </div>
                      <div className="mt-3 md:mt-0 md:w-1/2 space-y-4">
                        {question?.choices?.map((choice: IChoice, idx: number) => (
                          <div key={idx} className="flex space-x-2 items-center">
                            <span className="font-medium">{convertIndexToAlphabet(idx+1) + ". "}</span>
                            <div className="flex items-center">
                              <input 
                                required
                                type="radio" 
                                value={idx+1} 
                                className="form-radio-button" 
                                disabled={isSubmitting}
                                name={`${question.id}`}
                                onChange={(e) => handleChange(e, {
                                  choice_id: choice.id,
                                  question_id: question.id,
                                  is_correct: choice.is_correct,
                                  questionIdx: questionIdx
                                })}
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
          </>
        )}
    </Layout>
  )
}

export default authProtected(CategoryQuestions)
