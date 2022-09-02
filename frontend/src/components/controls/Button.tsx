import { FC, ReactNode } from 'react'
import tw, { TwStyle } from 'twin.macro'

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined
  children: ReactNode
  variant: any
  size?: string
  disabled?: boolean
}

const Button: FC<Props> = ({ children, type, variant, disabled }): JSX.Element => {
  return (
    <button
      type={type}
      css={[
        tw`inline-flex items-center py-2 px-4 text-sm font-medium`,
        tw`rounded-lg transition ease-in-out duration-200`,
        tw`focus:z-20 focus:ring-4 disabled:cursor-not-allowed`,
        tw`disabled:opacity-50`
      ]}
      disabled={disabled}
      className={variant}
    >
      {children}
    </button>
  )
}

export default Button
