import moment from 'moment'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'

const UserItem = ({ id, name, is_admin, email, avatar_url, created_at }: IUser): JSX.Element => {
  return (
    <tr className="table-tbody-tr">
      <td className="table-tbody-td">
        {id}
      </td>
      <th scope="row" className="table-tbody-th">
        <Avatar 
          width={32}
          height={32}
          url={`${avatar_url}`} 
        />
        <div className="pl-3">
          <div className="text-sm font-semibold">{name}</div>
        </div>  
      </th>
      <td className="table-tbody-td">
        {is_admin ? 'Admin' : 'User'}
      </td>
      <td className="table-tbody-td">
        {email}
      </td>
      <td className="table-tbody-td">
        {moment(created_at).format("MMM Do YY")}
      </td>
    </tr>
  )
}

export default UserItem
