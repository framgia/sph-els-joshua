import React from 'react'

import Layout from '~/layouts/userLayout'
import CategoryCard from '~/components/user/CategoryCard'

const Categories = (): JSX.Element => {
  return (
    <Layout metaTitle="Categories">
      <div className="pt-5 space-x-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-4">
          {[0,1,2,3,4,5].map((i: number) => <CategoryCard key={i} i={i} />)}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
