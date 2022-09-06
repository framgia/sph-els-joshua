import React from 'react'
import { MdAdd } from 'react-icons/md'
import { useRouter } from 'next/router'
import { ImSearch } from 'react-icons/im'

import { styles } from '~/twin/admin.caption.styles'
import { styles as global } from '~/twin/global.styles'  

type Props = {
  title: string
  description: string
  setSearchedVal: React.Dispatch<React.SetStateAction<string>>
}

const Caption: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const { title, description, setSearchedVal } = props

  return (
    <caption css={styles.caption}>
      <div css={styles.wrapper}>
        <div css={styles.title}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div css={styles.field_wrapper}>
          <div>
            <div>
              <ImSearch className="ml-0.5 w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={(e) => setSearchedVal(e.target.value)}
              css={global.form_control}
              placeholder="Search"
            />
          </div>
          {router.pathname.includes('/admin/categories') && (
            <button 
              type="button" 
              className="btn-success"
              onClick={() => router.push('/admin/categories/create')}
            >
              <MdAdd className="mr-1 w-4 h-4" />
              Add
            </button>
          )}
          {router.pathname.includes('/admin/questions') && (
            <button 
              type="button" 
              className="btn-success"
              onClick={() => router.push('/admin/questions/create')}
            >
              <MdAdd className="mr-1 w-4 h-4" />
              Add
            </button>
          )}
        </div>
      </div>
    </caption>
  )
}

export default Caption
