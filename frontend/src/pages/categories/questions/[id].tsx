import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { ICategoryQuestion, IChoice, IQuestion } from '~/data/interfaces'
import { authProtected } from '~/utils/auth-protected'

const CategoryQuestions = (): JSX.Element => {
  const router = useRouter()
  const [categoryQuestions, setCategoryQuestions]: any[] = useState()
  
  const { id } = router.query

  useEffect(() => {
    const getCategoryQuestionsById = async () => {
      const { data } = await fetcher(`/api/category-privilege/${id}`)
      setCategoryQuestions(data)
    }
    getCategoryQuestionsById()
  }, [id])

  return (
    <Layout metaTitle="Question">
      <div className="border-b pb-3">
        <h1 className="text-xl font-semibold">{categoryQuestions?.title}</h1>
      </div>
      <div className="pt-5 pb-4">
        {!categoryQuestions ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-orange-500" />
            </div>
          ) : (
            <>
              <form className="divide-y">
                {categoryQuestions?.questions.map((question: ICategoryQuestion, i: number) => (
                  <form key={i} className="flex flex-col pb-10 pt-4">
                    <div className="inline-flex">
                      <div className="w-1/2">
                        <label className="text-base font-semibold">{i+1}. {question?.value}</label>
                      </div>
                      <div className="w-1/2 space-y-4">
                        <label className="text-base font-semibold">Choices</label>
                        {question?.choices?.map((choice: IChoice, i: number) => (
                          <div key={i} className="flex items-center">
                            <input type="radio" name="default-radio" className="form-radio-button" />
                            <label className="ml-2 text-sm font-medium">{choice?.value}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                ))}
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="btn-primary">Submit Answer</button>
                </div>
              </form>
            </>
          )}
      </div>
    </Layout>
  )
}

export default CategoryQuestions
