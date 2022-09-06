import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { AiTwotoneEdit } from 'react-icons/ai'
import { AiTwotoneDelete } from 'react-icons/ai'

import { classNames } from '~/helpers/classNames'

type Props = {
  [question: string]: any 
  actions: { 
    handleDelete: (id: string) => void
  }
}

const QuestionItem: React.FC<Props> = (props): JSX.Element => {
  const { actions, ...question } = props
  const { handleDelete } = actions
  const { id, category_id, value, created_at } = question

  return (
    <tr>
      <td>
        {id}
      </td>
      <td className="table-tbody-td font-medium">
        {category_id}
      </td>
      <td>
        {value}
      </td>
      <td>
        {moment(created_at).format("MMM Do YY")}
      </td>
      <td>
        <div className={classNames(
          'inline-flex rounded-md'
        )} role="group">
          <Link href={`/admin/questions/update/${id}`}>
            <a className={classNames(
                'table-tbody-td-btn rounded-l-lg hover:text-yellow-400',
                'active:yellow-400'
              )}
            >
              <AiTwotoneEdit className="mr-2 w-4 h-4 fill-current" />
            </a>
          </Link>
          <button 
            type="button" 
            onClick={() => handleDelete(id)}
            className={classNames(
              'table-tbody-td-btn rounded-r-lg hover:text-red-400',
              'active:yellow-400'
            )}
          >
            <AiTwotoneDelete className="mr-2 w-4 h-4 fill-current" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default QuestionItem
