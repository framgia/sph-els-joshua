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
    const current_id = user?.followers?.map(({ id }) => id)
    return current_id == author?.id ? 'Unfollow' : 'Follow'
  }

  const handleFollow = async (props: HandleFollowProps): Promise<void> => {
    const { user, author, mutate, setLoading } = props
  
    setLoading(true)
    const current_id = user?.followers?.map(({ id }) => id)
  
    if (current_id == author?.id) {
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
