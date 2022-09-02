import useSWR from 'swr'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

import axios from '~/lib/axios'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/adminLayout'
import { styles } from '~/twin/global.styles'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'
import CategoryList from '~/components/admin/CategoryList'

const Categories: NextPage = (): JSX.Element => {
  const { data: categories, mutate } = useSWR('/api/categories', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const loading = !categories?.data

  const [pageNumber, setPageNumber] = useState(0)

  const cagoryPerPage = 5
  const pagesVisited = pageNumber * cagoryPerPage

  const displayCategories = categories?.data?.slice(pagesVisited, pagesVisited + cagoryPerPage)

  const pageCount = Math.ceil(categories?.data?.length / cagoryPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)
  
  const handleDelete = async (id: string): Promise<void> => {
    const result = confirm('Are you sure you want to delete?')
    if (result) {
      await 
        axios
          .delete(`/api/categories/${id}`)
          .then(async () => {
            await mutate()
            toast.success('Deleted Successfully!')
          })
    }
  }

  return (
    <Layout metaTitle="Categories">
      <main css={styles.admin_main}>
        <section css={styles.admin_section}>
          <CategoryList 
            categories={displayCategories} 
            loading={loading} 
            actions={{ handleDelete }}
          />
          {!loading && (
            <Pagination 
              length={categories?.length}
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

export default adminProtected(Categories)
