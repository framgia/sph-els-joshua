import React from 'react'

import { IThead } from '~/data/interfaces'
 
type Props = {
  theads: IThead[]
}

const TableHead: React.FC<Props> = ({ theads }): JSX.Element => {
  return (
    <thead className="table-thead">
      <tr>
        {theads?.map(({ name }, i: number) => <th key={i} scope="col" className="table-thead-th">{name}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead
