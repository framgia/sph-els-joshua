import moment from 'moment'
import React, { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { AiTwotoneDelete } from 'react-icons/ai'

import Caption from './Caption'
import TableHead from './TableHead'
import { classNames } from '~/utils/classNames'
import { ICategory, IThead } from '~/data/interfaces'

type Props = {
  categories: ICategory[] 
  loading: boolean
}

const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { categories, loading } = props
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
    <table className="table">
      <Caption
        title="Categories Table"
        description="List of all categories"
        setSearchedVal={setSearchedVal}
      />
      <TableHead theads={tHeads} />
      <tbody>
        {categories?.filter((row: ICategory) =>
            !searchedVal?.length || row?.title
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()) 
            )
          ?.map((user: ICategory) => (
          <tr key={user?.id} className="table-tbody-tr">
            <td className="table-tbody-td">
              {user?.id}
            </td>
            <td className="table-tbody-td font-medium">
              {user?.title}
            </td>
            <td className="table-tbody-td">
              <span className="line-clamp-2">{user?.description}</span>
            </td>
            <td className="table-tbody-td">
              {moment(user?.created_at).format("MMM Do YY")}
            </td>
            <td className="table-tbody-td">
              <div className={classNames(
                'inline-flex rounded-md'
              )} role="group">
                <button type="button" className={classNames(
                  'table-tbody-td-btn rounded-l-lg hover:text-yellow-400',
                  'active:yellow-400'
                )}>
                  <AiTwotoneEdit className="mr-2 w-4 h-4 fill-current" />
                </button>
                <button type="button" className={classNames(
                  'table-tbody-td-btn rounded-r-lg hover:text-red-400',
                  'active:yellow-400'
                )}>
                  <AiTwotoneDelete className="mr-2 w-4 h-4 fill-current" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CategoryList
