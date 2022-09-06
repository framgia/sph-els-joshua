import Link from 'next/link'
import { KeyedMutator } from 'swr'
import ReactAvatar from 'react-avatar'
import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'

import Avatar from './../Avatar'
import { useFollow } from '~/helpers/follow'
import { styles } from '~/twin/users.styles'
import { classNames } from '~/helpers/classNames'
import { IProfile, IUser } from '~/data/interfaces'

type Props = {
  user: IProfile
  author: IUser
  index: number
  mutate: KeyedMutator<any>
}

const UserItem: React.FC<Props> = ({ user, author, mutate, index }): JSX.Element => {
  const { handleFollow, followStatus } = useFollow()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <li 
      css={styles.li}
      data-aos="fade-up"
      data-aos-delay={`${400+(index+200)}`}
    >
      <div css={styles.list_wrapper}>
        <Link href={`/profile/${user?.id}`}>
          <a className="link">
            {!user?.avatar_url ? (
              <ReactAvatar 
                name={user?.name} 
                size="40" 
                round="100%" 
              />
            ) : (
              <Avatar 
                url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                width={40}
                height={40}
              />
            )}
          </a>
        </Link>
        <div css={styles.user_details_wrapper}>
          <Link href={`/profile/${user?.id}`}>
            <a className="flex flex-row space-x-2">
              <span css={styles.link_name}>{user?.name}</span>
              <MdVerified className="w-4 h-4 text-[#20d5ec]" />
            </a>
          </Link>
          <h1 css={styles.h1}>{user?.email}</h1>
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        css={styles.follow}
        className="btn-default"
        onClick={() => handleFollow({ user, author, mutate, setLoading })}
      >
        {followStatus({ user, author })}
      </button>
    </li>
  )
}

export default UserItem
