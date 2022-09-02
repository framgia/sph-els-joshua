import React from 'react'
import { TiInfo } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'

import { classNames } from '~/helpers/classNames'

type Props = {
  errors: any
  setErrors?: any
  className?: string
}

const AuthValidationErrors: React.FC<Props> = (props): JSX.Element => { 
  const { errors, className, setErrors } = props

  const handleClose = (): void => setErrors([])

  return (
    <>
      {(errors?.length > 0) && (
        <div 
          className={classNames(
            'flex p-4 mb-4 bg-red-100 border-t-4',
            'border-red-500 dark:bg-red-200',
            `${className}`
          )} 
          role="alert"
        >
            <TiInfo className="flex-shrink-0 w-5 h-5 text-red-700" />
            <div className="ml-3 inline-flex flex-col">
              {errors?.map((error: string, i: number) => (
                  <ul key={i} className="flex flex-col">
                    <li className="text-sm font-medium text-red-700">{error}</li>
                  </ul>
              ))}
            </div>
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

export default AuthValidationErrors
