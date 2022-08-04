import Link from 'next/link'
import React, { useState } from 'react'

import LessonConfirmationDialog from './LessonConfirmationDialog'

type Props = {
  i: number
}

const CategoryCard: React.FC<Props> = ({ i }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)

  return (
    <div className="bg-white rounded-lg shadow-md border">
      <div className="px-5 py-5">
          <div className="space-y-3">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900">Basic 500</h5>
            <p className="text-sm line-clamp-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus possimus ab cum ipsam non eum perferendis adipisci qui impedit, modi quaerat sed. Necessitatibus nostrum quo sit provident esse sapiente perspiciatis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea culpa at cum nisi quod est odio voluptate quo, possimus non quas nostrum quibusdam! Odio blanditiis, architecto magni ea itaque totam.</p>
          </div>
          <div className="mt-3 flex justify-end items-center">
            <button 
              type="button"
              onClick={openModal}
            >
              <a className="btn-primary">Start</a>
            </button>
            <LessonConfirmationDialog 
              isOpen={isOpen}
              closeModal={closeModal}
              categories={[i]}
            />
          </div>
      </div>
    </div>
  )
}

export default CategoryCard
