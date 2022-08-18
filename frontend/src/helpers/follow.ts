import { KeyedMutator } from 'swr'
import { toast } from 'react-toastify'

import axios from '~/lib/axios'
import { IUser } from '~/data/interfaces'

type FollowStatusProps = {
  user: IUser
  author: any
}

type HandleFollowProps = {
  user: IUser
  author: any
  mutate: KeyedMutator<any>
  setLoading: React.Dispatch<React.SetStateAction<boolean>> 
}

export const useFollow = () => {

  const followStatus = (props: FollowStatusProps): string => {
    const { user, author } = props
    const current_id: any = user?.followers?.map(({ id }) => id)
    const filtered_user = current_id.filter((user_id: number) => user_id === author?.id) 
    return filtered_user.length === 0 ? 'Follow' : 'Unfollow'
  }

  const handleFollow = async (props: HandleFollowProps): Promise<void> => {
    const { user, author, mutate, setLoading } = props
  
    setLoading(true)
    const current_id: any = user?.followers?.map(({ id }) => id)
    const filtered_user = current_id.filter((user_id: number) => user_id === author?.id) 
  
    if (filtered_user.length !== 0) {
      // UNFOLLOW
      return await 
              axios
                .patch(`/api/follows/${user?.id}`, { following_id: user?.id })
                .then(async () => {
                  await mutate()
                  toast.success(`You unfollow ${user?.name}`)
                })
                .finally(() => setLoading(false))
    } else {
      // FOLLOW
      return await 
              axios
                .post('/api/follows', { following_id: user?.id })
                .then(async () => {
                  await mutate()
                  toast.success(`You follow ${user?.name}`)
                })
                .finally(() => setLoading(false))
    }
  }
  
  return {
    handleFollow,
    followStatus
  }
}
