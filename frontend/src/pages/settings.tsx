import React from 'react'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import ReactAvatar from 'react-avatar'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { useAuth } from '~/hooks/auth'
import Avatar from '~/components/Avatar'
import Layout from '~/layouts/userLayout'
import { Spinner } from '~/utils/Spinner'
import { classNames } from '~/helpers/classNames'
import { authProtected } from '~/utils/auth-protected'
import UserDetailsForm from '~/components/user/UserDetailsForm'
import UserChangePasswordForm from '~/components/user/UserChangePasswordForm'

type Props = {
  children: React.ReactNode
}

const Settings: NextPage = (): JSX.Element => {
  const { user, mutate } = useAuth({
    middleware: 'auth'
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm()

  const handleUpdate = async (data: any): Promise<void> => {
    const { avatar_url } = data

    const form = new FormData()
    form.append('avatar_url', avatar_url[0])

    await 
      axios
        .post('/api/upload-avatar', form)
        .then(async () => {
          await mutate()
          toast.success('Updated Profile Successfully!')
        })
        .catch(err => console.log(err))
  }

  return (
    <Layout metaTitle="Settings">
      {!user ? (
        <div className="flex justify-center w-full py-8">
          <Spinner className="w-6 h-6 text-red-500" />
        </div>
      ) : (
        <div 
          className="mt-6 flex flex-col md:flex-row space-x-4 overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="300"
        >
          <div className="mt-2 w-full md:w-1/2 min-h-[20vh]">
            <div className="flex flex-col items-center pb-3">
              <div className="inline-flex rounded-full shadow-lg">
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
              <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col">
                <input 
                  type="file" 
                  {...register('avatar_url', {
                    required: 'Avatar is required'
                  })}
                  accept="image/*"
                  className="mt-3 text-xs rounded-md bg-gray-100" 
                />
                {errors?.avatar_url && <span className="error">{`${errors?.avatar_url?.message}`}</span>}
                <button 
                  className={classNames(
                    'btn-default mt-4 rounded-md py-1.5 cursor-pointer',
                    'text-center'
                  )} 
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Uploading...' : 'Upload'}
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <section
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="400"
            >
              <Title>Your Details</Title>
              <Card>
                <UserDetailsForm user={user} mutate={mutate} />
              </Card>
            </section>
            <section 
              className="mt-6"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="600"
            >
              <Title>Change your password</Title>
              <Card>
                <UserChangePasswordForm user={user} />
              </Card>
            </section>
          </div>
        </div>
      )}
    </Layout>
  )
}

const Title = ({ children }: Props) => <h5 className="text-xl font-bold text-gray-900">{children}</h5>

const Card = ({ children }: Props) => <div className="mt-2 bg-white rounded-lg shadow-primary border-gray-200 p-6">{children}</div>

export default authProtected(Settings)
