import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { classNames } from '~/utils/classNames'
import { authProtected } from '~/utils/auth-protected'
import { IQuestionAndAnswer } from '~/data/interfaces'

const Results: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query
  
  const [lessonResults, setLessonResults] = useState<IQuestionAndAnswer>()
  
  useEffect(() => {
    const getLessonResultsById = async () => {
      const { data } = await fetcher(`/api/lessons/${id}`)
      setLessonResults(data)
    }
    getLessonResultsById()
  }, [id])

  return (
    <Layout metaTitle="Results">
      {lessonResults ? (
        <>
          <div className="flex items-center justify-between px-5 py-3 rounded-md bg-white">
            <div className="text-xl font-bold text-red-500">
              {`${lessonResults?.name} "${lessonResults?.get_category_title}" Results`}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Result:</span> {lessonResults?.count_correct_answer} of {lessonResults?.count_question}
            </div>
          </div>
          <div className="mt-2 py-3 bg-white p-5 rounded-md shadow-primary">
            <div className="flex">
              <div className="flex flex-col space-y-2 divide-y w-full">
                {lessonResults?.get_question_and_answer.map(({ question_title, is_correct, your_answer }, i: number) => (
                  <div key={i}>
                    <div className="flex flex-col space-y-2 py-2">
                      <div className="flex items-center space-x-2">
                        <label className="text-lg font-semibold">{`${i+1}. ${question_title}`}</label>
                        <div className={classNames(
                          'flex items-center px-1 py-0.5',
                          'rounded-full space-x-1 text-white',
                          is_correct ? 'bg-green-500' : 'bg-red-500'
                        )}>
                          {is_correct ? <BsFillCheckCircleFill className="w-4 h-4"/> : <AiFillCloseCircle className="w-4 h-4"/>}
                          <span className="text-xs font-medium">{is_correct ? 'Correct' : 'Wrong'}</span>
                        </div>
                      </div>
                      <p className="pl-4 text-sm text-gray-500">
                        <span>{lessonResults?.name} answer: </span>
                        <span className="text-xs bg-purple-500 py-0.5 px-1 rounded-full text-white">{your_answer}</span>
                      </p>
                    </div>
                  </div> 
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center w-full py-8">
          <Spinner className="w-6 h-6 text-red-500" />
        </div>
      )}
    </Layout>
  )
}

export default authProtected(Results)
