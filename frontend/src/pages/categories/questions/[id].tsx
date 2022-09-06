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
import Loading from '~/components/Loading'
import { authProtected } from '~/utils/auth-protected'
import { ICategoryQuestion, IChoice } from '~/data/interfaces'
import { styles } from '~/twin/categories.questions.index.styles'
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

  const handleSave = async (): Promise<void> => {
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
      {!categoryQuestions 
      ? <Loading />
      : (
          <>
            <div css={styles.category_title}>
              <h1>"{categoryQuestions?.title}"</h1>
            </div>
            <form 
              onSubmit={handleSubmit(handleSave)} 
              css={styles.question_form}
            >
              <div>
                {categoryQuestions?.questions.map((question: ICategoryQuestion, questionIdx: number) => (
                  <div key={questionIdx} css={styles.question_wrapper}>
                    <div>
                      <div>
                        <label>{questionIdx+1}. {question?.value}</label>
                      </div>
                      <div css={styles.choices_container}>
                        {question?.choices?.map((choice: IChoice, idx: number) => (
                          <div key={idx} css={styles.choices_wrapper}>
                            <span>{convertIndexToAlphabet(idx+1) + ". "}</span>
                            <div>
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
                              <label>
                                {choice?.value}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div css={styles.btn_wrapper}>
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
