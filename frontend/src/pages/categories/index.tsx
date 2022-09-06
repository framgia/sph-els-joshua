import useSWR from 'swr'
import React from 'react'
import { NextPage } from 'next'

import { useAuth } from '~/hooks/auth'
import { fetcher } from '~/lib/fetcher'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { ICategory } from '~/data/interfaces'
import { authProtected } from '~/utils/auth-protected'
import { styles } from '~/twin/categories.index.styles'
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
      <main 
        css={styles.main}
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="600"
      >
        {!categories 
        ? <Loading /> 
        : (
            <div css={styles.grid_wrapper}>
              {categories?.data?.map((category: ICategory, i: number) => <CategoryCard key={i} category={category} author={author} delay={i} />)}
            </div>
          )}
      </main>
    </Layout>
  )
}

export default authProtected(Categories)
