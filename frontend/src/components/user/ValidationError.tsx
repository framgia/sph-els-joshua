import React from 'react'
import { TiInfo } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'

import { classNames } from "~/utils/classNames"

type Props = {
  error: string
  className?: string
  setFormError: () => any
}

const ValidationError: React.FC<Props> = ({ className, error, setFormError }) => {
  const handleClose = (): void => setFormError()
  return (
    <>
      {error && (
        <div 
          className={classNames(
            'flex p-4 mb-4 bg-red-100 border-t-4',
            'border-red-500 dark:bg-red-200',
            `${className}`
          )} 
          role="alert"
        >
            <TiInfo className="flex-shrink-0 w-5 h-5 text-red-700" />
            <p className="ml-3 text-sm font-medium text-red-700">{error}</p>
            <button 
              type="button" 
              onClick={handleClose}
              className="btn-dismiss"  
            >
              <span className="sr-only">Dismiss</span>
              <IoClose className="w-5 h-5" />
            </button>
        </div>
      )}
    </>
  )
}

export default ValidationError
