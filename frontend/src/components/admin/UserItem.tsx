import moment from 'moment'

import Avatar from './../Avatar'
import { defaultAvatar } from '~/utils/defaultAvatar'

type Props = {
  [user: string]: any
}

const UserItem: React.FC<Props> = (props): JSX.Element => {
  const { id, name, is_admin, email, avatar_url, created_at } = props

  return (
    <tr className="table-tbody-tr">
      <td className="table-tbody-td">
        {id}
      </td>
      <th scope="row" className="table-tbody-th">
        <Avatar 
          width={32}
          height={32}
          url={`${
            avatar_url === null ? 
            defaultAvatar : 
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${avatar_url}`
          }`}
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
