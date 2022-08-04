import React from 'react'
import { useRouter } from 'next/router'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { results } from '~/data/results'
import Layout from '~/layouts/userLayout'
import { classNames } from '~/utils/classNames'

const Results = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout metaTitle="Results">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-lg font-semibold">Basic 500</h1>
        <div className="text-lg">
          <span className="font-semibold">Result:</span> 15 of 20
        </div>
      </div>
      <div className="py-3">
        <div className="flex">
          <div className="flex flex-col space-y-2 divide-y">
            {results?.map(({ value, choice_id, is_correct }, i) => (
              <div key={i} className="flex items-center space-x-2 py-2">
                <label className="text-base font-semibold">{`${i+1}. ${value}`}</label>
                <div className={classNames(
                  'flex items-center px-1 py-0.5',
                  'rounded-full space-x-1 text-white',
                  is_correct ? 'bg-green-500' : 'bg-red-500'
                )}>
                  {is_correct ? <BsFillCheckCircleFill className="w-4 h-4"/> : <AiFillCloseCircle className="w-4 h-4"/>}
                  <span className="text-xs font-medium">{choice_id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default Results
