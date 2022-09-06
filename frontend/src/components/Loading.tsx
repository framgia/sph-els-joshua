import tw from 'twin.macro'
import React, { FC } from 'react'

import { Spinner } from '~/utils/Spinner'

type Props = {
  css?: string
}

const styles = {
  wrapper: tw`flex justify-center w-full py-8 text-red-500`
}

const Loading: FC<Props> = ({ css }): JSX.Element => {
  return (
    <div css={styles.wrapper}>
      <Spinner className="w-6 h-6" css={css} />
    </div>
  )
}

export default Loading
