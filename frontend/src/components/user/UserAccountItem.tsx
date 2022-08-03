import React from 'react'
import { MdVerified } from 'react-icons/md'

import Avatar from '~/components/Avatar'
import { IUser } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'


type Props = {
  user: IUser
}

const UserAccountItem: React.FC<Props> = (props): JSX.Element => {
  const { user } = props
  const { name, avatar_url, email } = user

  return (
    <li className={classNames(
      'hover:bg-orange-50 px-2 py-1',
      'flex items-center justify-between'
    )}>
      <div
        className={classNames(
          'w-full rounded-lg flex items-center py-1.5 space-x-4',
          'transition ease-in-out duration-150'
        )}
      >
        <div className="relative rounded-full overflow-hidden">
          <Avatar
            url={avatar_url ? avatar_url : 'https://avatars.githubusercontent.com/u/108642414?v=4'}
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-1">
            <span className="text-sm font-bold capitalize">{name}</span>
            <MdVerified className="w-4 h-4 text-[#20d5ec]" />
          </div>
            <h1 className={classNames(
              'text-xs font-medium text-left',
              'text-gray-600 lowercase'
            )}>{email}</h1>
        </div>
      </div>
      <button 
        type="button" 
        className={classNames(
          'btn-default rounded-full px-5 py-1',
          'font-semibold text-xs'
        )}
      >
        Follow
      </button>
    </li>
  )
}

export default UserAccountItem
