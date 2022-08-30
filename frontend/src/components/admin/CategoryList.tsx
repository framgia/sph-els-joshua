import React, { useState } from 'react'

import Caption from './Caption'
import TableHead from './Tablehead'
import { Spinner } from '~/utils/Spinner'
import CategoryItem from './CategoryItem'
import { classNames } from '~/helpers/classNames'
import { ICategory, IThead } from '~/data/interfaces'

type Props = {
  categories: ICategory[] 
  loading: boolean
  actions: {
    handleDelete: (id: string) => void
  }
}

const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { categories, loading, actions} = props
  const { handleDelete } = actions
  const [searchedVal, setSearchedVal] = useState<string>('')
  const tHeads: IThead[] = [
    {
      name: 'ID'
    },
    {
      name: 'Title'
    },
    {
      name: 'Description'
    },
    {
      name: 'Date Created'
    },
    {
      name: 'Actions'
    }
  ]

  return (
    <table className={classNames(
      'table max-h-[40vh]',
      loading ? 'relative min-h-[40vh]' : ''
    )}>
      <Caption
        title="Categories Table"
        description="List of all categories"
        setSearchedVal={setSearchedVal}
      />
      <TableHead theads={tHeads} />
      {loading ? (
        <div className="absolute insert-0 flex justify-center w-full py-8">
          <Spinner className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <tbody>
          {categories?.filter((row: ICategory) =>
            !searchedVal?.length || row?.title
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()))
          ?.map((category: ICategory) => <CategoryItem key={category?.id} {...category} actions={{ handleDelete }} />)}
        </tbody>
      )}
    </table>
  )
}

export default CategoryList
