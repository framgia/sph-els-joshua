import React from 'react'
import tw from 'twin.macro'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import ReactAvatar from 'react-avatar'
import { useForm } from 'react-hook-form'

import axios from '~/lib/axios'
import { useAuth } from '~/hooks/auth'
import Avatar from '~/components/Avatar'
import Layout from '~/layouts/userLayout'
import Loading from '~/components/Loading'
import { styles } from '~/twin/settings.styles'
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
      {!user 
      ? <Loading /> 
      : (
        <div 
          css={styles.wrapper}
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="300"
        >
          <div css={styles.avatar_container}>
            <div css={styles.avatar_wrapper}>
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
              <form 
                onSubmit={handleSubmit(handleUpdate)} 
                css={styles.avatar_form}
              >
                <input 
                  type="file" 
                  {...register('avatar_url', {
                    required: 'Avatar is required'
                  })}
                  css={styles.input_file}
                  accept="image/*"
                />
                {errors?.avatar_url && <span className="error">{`${errors?.avatar_url?.message}`}</span>}
                <button 
                  className="btn-default"
                  css={styles.btn_upload}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Uploading...' : 'Upload'}
                </button>
              </form>
            </div>
          </div>
          <div css={tw`flex flex-col flex-1`}>
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

const Title = ({ children }: Props) => <h5 css={styles.card}>{children}</h5>

const Card = ({ children }: Props) => <div css={styles.title}>{children}</div>

export default authProtected(Settings)
