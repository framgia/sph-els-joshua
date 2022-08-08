import useSWR from 'swr'
import React from 'react'

import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { ICategory } from '~/data/interfaces'
import CategoryCard from '~/components/user/CategoryCard'

const Categories = (): JSX.Element => {
  const { data: categories } = useSWR('/api/category-privilege', async () => fetcher('/api/category-privilege'), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle="Categories">
      <div className="w-full pt-5 space-x-4 overflow-hidden">
        {!categories ? (
          <div className="flex justify-center w-full py-8">
            <Spinner className="w-6 h-6 text-orange-500" />
          </div>
        ) : (
          <div  className="grid grid-cols-3 gap-4 pb-5">
            {categories?.data?.map((category: ICategory, i: number) => <CategoryCard key={i} category={category} />)}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Categories
