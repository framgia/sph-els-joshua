import React, { useState } from 'react'

import { ICategory } from '~/data/interfaces'
import { classNames } from '~/utils/classNames'
import LessonConfirmationDialog from './LessonConfirmationDialog'

type Props = {
  category: ICategory
}

const CategoryCard: React.FC<Props> = ({ category }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <div className={classNames(
      'bg-white rounded-lg shadow-sm border hover:shadow-xl',
      'transition ease-in-out duration-200'
    )}>
      <div className="flex flex-col justify-between px-5 py-5">
          <div className="space-y-3 min-h-[160px]">
            <h5 className="text-lg font-semibold tracking-tight">{category?.title}</h5>
            <p className="text-sm line-clamp-6">{category?.description}</p>
          </div>
          <div className="mt-3 flex justify-end">
            <button 
              type="button"
              onClick={openModal}
            >
              <a className="btn-primary">Start</a>
            </button>
            <LessonConfirmationDialog 
              isOpen={isOpen}
              closeModal={closeModal}
              category_id={category?.id}
            />
          </div>
      </div>
    </div>
  )
}

export default CategoryCard
