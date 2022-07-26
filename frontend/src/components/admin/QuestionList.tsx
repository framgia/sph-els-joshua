import React, { useState } from 'react'

import Caption from './Caption'
import TableHead from './Tablehead'
import { Spinner } from '~/utils/Spinner'
import QuestionItem from './QuestionItem'
import { IQuestion, IThead } from '~/data/interfaces'
import { styles as global } from '~/twin/global.styles'

type Props = {
  questions: IQuestion[] 
  loading: boolean
  actions: {
    handleDelete: (id: string) => void
  }
}

const QuestionList: React.FC<Props> = (props): JSX.Element => {
  const { questions, loading, actions} = props
  const { handleDelete } = actions
  const [searchedVal, setSearchedVal] = useState<string>('')
  const tHeads: IThead[] = [
    {
      name: 'ID'
    },
    {
      name: 'Category ID'
    },
    {
      name: 'Question'
    },
    {
      name: 'Date Created'
    },
    {
      name: 'Actions'
    }
  ]

  return (
    <table css={global.table({ loading })}>
      <Caption
        title="Question Table"
        description="List of all questions"
        setSearchedVal={setSearchedVal}
      />
      <TableHead theads={tHeads} />
      {loading ? (
        <div className="absolute insert-0 flex justify-center w-full py-8">
          <Spinner className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <tbody>
          {questions?.filter((row: IQuestion) =>
            !searchedVal?.length || row?.value
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase()))
          ?.map((question: IQuestion) => <QuestionItem key={question?.id} {...question} actions={{ handleDelete }} />)}
        </tbody>
      )}
    </table>
  )
}

export default QuestionList
