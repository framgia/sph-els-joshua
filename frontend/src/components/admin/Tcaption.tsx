import React from 'react'
import { ImSearch } from 'react-icons/im'

type Props = {
  title: string
  description: string
  setSearchedVal: React.Dispatch<React.SetStateAction<string>>
}

const TCaption: React.FC<Props> = (props) => {
  const { title, description, setSearchedVal } = props

  return (
    <caption className="p-5 text-lg text-left text-gray-900 bg-white dark:text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold ">{title}</h1>
          <p className="mt-1 text-sm font-normal text-gray-500">{description}</p>
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

export default TCaption
