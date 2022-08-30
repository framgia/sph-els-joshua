import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { ICategory } from '~/data/interfaces'
import { authProtected } from '~/utils/auth-protected'
import CategoryCard from '~/components/user/CategoryCard'

const Categories: NextPage = (): JSX.Element => {
  const { user: author } = useAuth({
    middleware: 'auth'
  })
  
  const { data: categories } = useSWR('/api/category-privilege', fetcher, {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  return (
    <Layout metaTitle="Categories">
      <section 
        className="w-full pt-5 space-x-4 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="600"
      >
        {!categories ? (
          <div className="flex justify-center w-full py-8">
          <Spinner className="w-6 h-6 text-red-500" />
          </div>
          ) : (
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
              {categories?.data?.map((category: ICategory, i: number) => <CategoryCard key={i} category={category} author={author} delay={i} />)}
            </div>
          )}
      </section>
    </Layout>
  )
}

export default authProtected(Categories)
