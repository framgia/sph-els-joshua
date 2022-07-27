import moment from 'moment'
import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'
import { AiTwotoneEdit } from 'react-icons/ai'
import { AiTwotoneDelete } from 'react-icons/ai'

import { ICategory } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'

type Props = {
  categories: ICategory[] 
  loading: boolean
}

const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { categories, loading } = props
  const [searchedVal, setSearchedVal] = useState('')

  return (
    <table className="table">
      <Captions setSearchedVal={setSearchedVal} />
      <Thead />
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

function Captions ({ setSearchedVal }: { setSearchedVal: any }) {
  return (
    <caption className="p-5 text-lg text-left text-gray-900 bg-white dark:text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold ">Categories Table</h1>
          <p className="mt-1 text-sm font-normal text-gray-500">List of all categories</p>
        </div>
        <div className="mt-1 relative lg:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ImSearch className="ml-0.5 w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            onChange={(e) => setSearchedVal(e.target.value)}
            className="form-control pl-10 mt-0"
            placeholder="Search"
          />
        </div>
      </div>
    </caption>
  )
}

function Thead () {
  const theads = [
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
    <thead className="table-thead">
      <tr>
        {theads?.map(({ name }, i: number) => <th key={i} scope="col" className="table-thead-th">{name}</th>)}
      </tr>
    </thead>
  )
}

export default CategoryList
