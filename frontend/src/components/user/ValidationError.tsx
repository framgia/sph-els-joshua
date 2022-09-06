import React from 'react'
import tw from 'twin.macro'
import { TiInfo } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'

type Props = {
  error: string
  className?: string
  setFormError: () => any
}

const styles = {
  wrapper: [
    tw`flex p-4 mb-4 bg-red-100 border-t-4`,
    tw`
      border-red-500 dark:bg-red-200
      [> p]:(ml-3 text-sm font-medium text-red-700)
      [> button > span]:(sr-only)
    `
  ]
}

const ValidationError: React.FC<Props> = ({ className, error, setFormError }) => {
  const handleClose = (): void => setFormError()
  return (
    <>
      {error && (
        <div 
          className={className}
          css={styles.wrapper} 
          role="alert"
        >
            <TiInfo className="flex-shrink-0 w-5 h-5 text-red-700" />
            <p>{error}</p>
            <button 
              type="button" 
              onClick={handleClose}
              className="btn-dismiss"  
            >
              <span>Dismiss</span>
              <IoClose className="w-5 h-5" />
            </button>
        </div>
      )}
    </>
  )
}

export default ValidationError
