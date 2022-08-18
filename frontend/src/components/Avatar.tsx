import React from 'react'

type Props = { 
  url: string 
  width?: number
  height?: number
}

const Avatar: React.FC<Props> = (props): JSX.Element => {
  const { url, width, height } = props

  return (
    <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
      <div className="bg-white p-0.5 rounded-full flex flex-shrink-0 overflow-hidden">
        <img 
          src={url}
          alt="avatar" 
          style={{ width, height }}
          className="rounded-full"
        />
      </div>
    </div>
  )
}

export default Avatar
