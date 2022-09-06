import { KeyedMutator } from 'swr'
import ReactAvatar from 'react-avatar'
import React, { useState } from 'react'

import Avatar from '../Avatar'
import { useAuth } from '~/hooks/auth'
import { IProfile } from '~/data/interfaces'
import { useFollow } from '~/helpers/follow'
import { styles } from '~/twin/user.profile_card.styles'

type Props = {
  user: IProfile
  mutate: KeyedMutator<any>
  isAuthor: boolean
}

const ProfileCard: React.FC<Props> = (props): JSX.Element => {
  const { user, mutate, isAuthor } = props
  const [loading, setLoading] = useState<boolean>(false)
  
  const { followStatus, handleFollow } = useFollow()
  const { user: author } = useAuth({
    middleware: 'auth'
  })

  return (
    <section css={styles.wrapper}>
      <div css={styles.container}>
        <div css={styles.avatar}>
          {!user?.avatar_url ? (
            <ReactAvatar 
              name={user?.name} 
              size="150" 
              round="100%" 
            />
          ) : (
            <Avatar 
              url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
              width={150}
              height={150}
            />
          )}
        </div>
        <h5 css={styles.name}>{user?.name}</h5>
        <div css={styles.follow_wrapper}>
          <div>
            <p>{user?.count_followers}</p>
            <a href="#" className="link">Followers</a>
          </div>
          <div>
            <p>{user?.count_followings}</p>
            <a href="#" className="link">Following</a>
          </div>
        </div>
        <div css={styles.btn_follow_wrapper}>
          {(!isAuthor && user?.id !== author?.id) && (
            <button 
              type="submit"
              disabled={loading}
              onClick={() => handleFollow({ user, author, mutate, setLoading })}
              className="btn-default"
            >
              {followStatus({ user, author })}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
