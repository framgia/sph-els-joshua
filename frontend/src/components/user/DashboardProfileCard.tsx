import React from 'react'
import Link from 'next/link'
import ReactAvatar from 'react-avatar'
import { AiFillCaretLeft } from 'react-icons/ai'

import Avatar from './../Avatar'
import { IUser } from '~/data/interfaces'
import { styles } from '~/twin/user.dashboard_profile_card.styles'

type Props = {
  user: IUser
  lessons: {
    count_correct_lessons_answer: number
    count_lessons_taken: number
  }
}

const DashboardProfileCard: React.FC<Props> = ({ user, lessons }): JSX.Element => {
  return (
    <div  
      css={styles.wrapper}
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 css={styles.title}>Dashboard</h2>
      <div css={styles.container}>
        <div css={styles.avatar}>
          <Link href={`/profile/${user?.id}`}>
            <a className="link">
              {!user?.avatar_url ? (
                <ReactAvatar 
                  name={user?.name} 
                  size="120" 
                  round="100%" 
                />
              ) : (
                <Avatar 
                  url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar_url}`}
                  width={120}
                  height={120}
                />
              )}
            </a>
          </Link>
        </div>
        <div css={styles.user_wrapper}>
          <div css={styles.user_name}>
            <Link href={`/profile/${user?.id}`}>
              <a className="link">{user?.name}</a>
            </Link>
            <AiFillCaretLeft className="w-4 h-4" />
          </div>
          <div css={styles.user_lessons}>
            <a 
              href="#" 
              className="link"
            >Learned {lessons?.count_correct_lessons_answer} words</a>
            <a 
              href="#" 
              className="link"
            >Learned {lessons?.count_lessons_taken} lessons</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfileCard
