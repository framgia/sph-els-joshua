import { NextPage } from 'next'
import React, { useState } from 'react'

import Layout from '~/layouts/adminLayout'
import { categories } from '~/data/categories'
import Pagination from '~/components/admin/Pagination'
import { adminProtected } from '~/utils/admin-protected'
import CategoryList from '~/components/admin/CategoryList'

const Categories: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState(false)

  const [pageNumber, setPageNumber] = useState(0)

  const cagoryPerPage = 5
  const pagesVisited = pageNumber * cagoryPerPage

  const displayCategories = categories?.slice(pagesVisited, pagesVisited + cagoryPerPage)

  const pageCount = Math.ceil(categories?.length / cagoryPerPage)

  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <Layout metaTitle="Categories">
      <main className="pt-4 px-4">
        <section className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <CategoryList categories={displayCategories} loading={loading} />
          <Pagination 
            length={categories?.length}
            pageNumber={pageNumber}
            pageCount={pageCount}
            actions={{ changePage }}
          />
        </section>
      </main>
    </Layout>
  )
}

export default adminProtected(Categories)
