import React from 'react'
import tw from 'twin.macro'

type Props = { 
  url: string 
  width?: number
  height?: number
}

const styles = {
  wrapper: [
    tw`
      p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-400
      [> div]:(bg-white p-0.5 rounded-full flex flex-shrink-0 overflow-hidden)
      [> div > img]:(rounded-full)
    `
  ]
}

const Avatar: React.FC<Props> = (props): JSX.Element => {
  const { url, width, height } = props

  return (
    <div css={styles.wrapper}>
      <div>
        <img 
          src={url}
          alt="avatar" 
          style={{ width, height }}
        />
      </div>
    </div>
  )
}

export default Avatar
