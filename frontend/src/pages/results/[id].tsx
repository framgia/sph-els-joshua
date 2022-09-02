import tw from 'twin.macro'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/results.styles'
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
          <div css={styles.result_title}>
            <div>
              {`${lessonResults?.name} "${lessonResults?.get_category_title}" Results`}
            </div>
            <h1>
              Result: {lessonResults?.count_correct_answer} of {lessonResults?.count_question}
            </h1>
          </div>
          <div css={styles.result_content}>
            {lessonResults?.get_question_and_answer.map(({ question_title, is_correct, your_answer }, i: number) => (
              <div key={i}>
                <div css={styles.result_lessons}>
                  <div css={styles.result_question_wrapper}>
                    <label>{`${i+1}. ${question_title}`}</label>
                    <div css={styles.result_status({ is_correct })}>
                      {is_correct 
                        ? <BsFillCheckCircleFill className="w-4 h-4"/> 
                        : <AiFillCloseCircle className="w-4 h-4"/>}
                      <span css={tw`text-xs font-medium`}>{is_correct ? 'Correct' : 'Wrong'}</span>
                    </div>
                  </div>
                  <p css={styles.p}>
                    <h3>{lessonResults?.name} answer: </h3>
                    <span>{your_answer}</span>
                  </p>
                </div>
              </div> 
            ))}
          </div>
        </>
      ) : <Loading />}
    </Layout>
  )
}

export default authProtected(Results)
