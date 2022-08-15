import React, { useState } from 'react'

import { classNames } from '~/utils/classNames'
import { ICategory, ILesson, IUser } from '~/data/interfaces'
import LessonConfirmationDialog from './LessonConfirmationDialog'

type Props = {
  category: ICategory
  author: IUser
}

const CategoryCard: React.FC<Props> = ({ category, author }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const get_author_lessons = category?.lessons?.map(({ user_id }: ILesson) => user_id === author?.id)

  const is_already_taken: any = get_author_lessons?.filter(value => value)

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
            disabled={is_already_taken[0]}
            onClick={openModal}
            className="btn-primary"
          >
            {is_already_taken[0] ? 'Done' : 'Start'}
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
