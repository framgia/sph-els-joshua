import moment from 'moment'
import ReactAvatar from 'react-avatar'

import Avatar from './../Avatar'
import { defaultAvatar } from '~/helpers/defaultAvatar'

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
        {!avatar_url ? (
          <ReactAvatar 
            name={name} 
            size="32" 
            round="100%" 
          />
        ) : (
          <Avatar 
            url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${avatar_url}`}
            width={32}
            height={32}
          />
        )}
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
