import React from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { MdWarningAmber } from 'react-icons/md'
import { RiUserSharedLine } from 'react-icons/ri'

import DialogBox from './../DialogBox'
import { classNames } from '~/utils/classNames'

type Props = {
  isOpen: boolean
  closeModal: () => void
  categories: number[]
}

const LessonConfirmationDialog: React.FC<Props> = (props) => {
  const { isOpen, closeModal, categories } = props
  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className={classNames(
        'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6',
        'text-left align-middle shadow-xl transition-all'
      )}>
        <Dialog.Title
          as="h3"
          className="flex items-center space-x-3 text-xl font-bold leading-6 text-gray-800"
        >
          <MdWarningAmber className="w-5 h-5 text-red-500" /> 
          <span>Do you wish to proceed?</span>
        </Dialog.Title>
        <div className="mt-4">
          <p className="text-md text-gray-500">
            Once you proceed to this exam, you will never gonna retake the exam again.
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <Link href={`/categories/questions/${categories}`}>
            <a className="btn-primary inline-flex items-center space-x-2">
              <RiUserSharedLine className="w-4 h-4" />
              <span>Take the quiz</span>
            </a>
          </Link>
        </div>
      </Dialog.Panel>
    </DialogBox>
  )
}

export default LessonConfirmationDialog
