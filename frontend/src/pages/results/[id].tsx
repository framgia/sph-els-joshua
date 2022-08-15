import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { IAnswer } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'
import { authProtected } from '~/utils/auth-protected'

const Results: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query
  
  const [lessonResults, setLessonResults]: any[] = useState()
  
  useEffect(() => {
    const getLessonResultsById = async () => {
      const { data } = await fetcher(`/api/lessons/${id}`)
      setLessonResults(data)
    }
    getLessonResultsById()
  }, [id])

  const getCategoryTitle = lessonResults?.answers[0]?.question?.category?.title

  const getCountCorrectAnswer = lessonResults?.answers?.filter((answer: IAnswer) => answer?.question?.choice_id == answer?.choice_id).length

  return (
    <Layout metaTitle="Results">
      {lessonResults && (
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-lg font-semibold">{getCategoryTitle}</h1>
          <div className="text-lg">
            <span className="font-semibold">Result:</span> {getCountCorrectAnswer} of {lessonResults?.answers?.length}
          </div>
        </div>
      )}
      <div className="py-3">
        <div className="flex">
          <div className="flex flex-col space-y-2 divide-y w-full">
          {!lessonResults ? (
            <div className="flex justify-center w-full py-8">
              <Spinner className="w-6 h-6 text-orange-500" />
            </div>
          ) : (
              <>
                {lessonResults?.answers?.map((answer: IAnswer, i: number) => {
                  const is_correct = answer?.question?.choice_id == answer?.choice_id

                  return (
                    <div key={i} className="flex items-center space-x-2 py-2">
                      <label className="text-base font-semibold">{`${i+1}. ${answer?.question?.value}`}</label>
                      <div className={classNames(
                        'flex items-center px-1 py-0.5',
                        'rounded-full space-x-1 text-white',
                        is_correct ? 'bg-green-500' : 'bg-red-500'
                      )}>
                      {is_correct ? <BsFillCheckCircleFill className="w-4 h-4"/> : <AiFillCloseCircle className="w-4 h-4"/>}
                      <span className="text-xs font-medium">{is_correct ? 'Correct' : 'Wrong'}</span>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default authProtected(Results)
