import React from 'react'

import { IThead } from '~/data/interfaces'
 
type Props = {
  theads: IThead[]
}

const THead: React.FC<Props> = ({ theads }) => {
  return (
    <thead className="table-thead">
      <tr>
        {theads?.map(({ name }, i: number) => <th key={i} scope="col" className="table-thead-th">{name}</th>)}
      </tr>
    </thead>
  )
}

export default THead
