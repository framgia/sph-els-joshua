import React from 'react'
import { useRouter } from 'next/router'

import Layout from '~/layouts/userLayout'

const Questions = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout metaTitle="Question">
      <div className="border-b pb-3">
        <h1 className="text-xl font-semibold">Basic 500</h1>
      </div>
      <div className="pt-5 pb-4">
        <form className="divide-y">
          {[0,1,2].map((i) => (
            <form key={i} className="flex flex-col pb-10 pt-4">
              <div className="inline-flex">
                <div className="w-1/2">
                  <label className="text-base font-semibold">{i+1}. What is the color of the sun?</label>
                </div>
                <div className="w-1/2 space-y-4">
                  <label className="text-base font-semibold">Choices</label>
                  <div className="flex items-center">
                    <input type="radio" name="default-radio" className="form-radio-button" />
                    <label className="ml-2 text-sm font-medium">Yellow</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="default-radio" className="form-radio-button" />
                    <label className="ml-2 text-sm font-medium">Brown</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="default-radio" className="form-radio-button" />
                    <label className="ml-2 text-sm font-medium">White</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="default-radio" className="form-radio-button" />
                    <label className="ml-2 text-sm font-medium">Pink</label>
                  </div>
                </div>
              </div>
            </form>
          ))}
          <div className="pt-4 flex justify-end">
            <button type="submit" className="btn-primary">Submit Answer</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}


export default Questions
