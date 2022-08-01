import useSWR from 'swr'
import { NextPage } from 'next'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import axios from '~/lib/axios'
import Layout from '~/layouts/adminLayout'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'
import QuestionList from '~/components/admin/QuestionList'

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

const Questions: NextPage = (): JSX.Element => {
  const { data: questions } = useSWR('/api/questions', async () => fetcher('/api/questions'), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const loading = !questions?.data

  const [pageNumber, setPageNumber] = useState(0)

  const cagoryPerPage = 5
  const pagesVisited = pageNumber * cagoryPerPage

  const displayQuestions = questions?.data?.slice(pagesVisited, pagesVisited + cagoryPerPage)

  const pageCount = Math.ceil(questions?.data?.length / cagoryPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)
  
  const handleDelete = async (id: string): Promise<void> => {}

  return (
    <Layout metaTitle="Categories">
      <main className="pt-4 px-4">
        <section className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <QuestionList 
            questions={displayQuestions} 
            loading={loading} 
            actions={{ handleDelete }}
          />
          {!loading && (
            <Pagination 
              length={questions?.length}
              pageNumber={pageNumber}
              pageCount={pageCount}
              actions={{ changePage }}
            />
          )}
        </section>
      </main>
    </Layout>
  )
}

export default adminProtected(Questions)
