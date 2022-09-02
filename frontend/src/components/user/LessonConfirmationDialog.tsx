import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { MdWarningAmber } from 'react-icons/md'
import { RiUserSharedLine } from 'react-icons/ri'

import DialogBox from './../DialogBox'

type Props = {
  isOpen: boolean
  closeModal: () => void
  category_id: number
}

const styles = {
  message: [
    tw`
      mt-4
      [> p]:(text-base text-gray-500)
    `
  ],
  a: [
    tw`
      inline-flex items-center space-x-2 cursor-pointer
      [> span]:(text-white)
    `
  ]
}

const LessonConfirmationDialog: React.FC<Props> = (props) => {
  const { isOpen, closeModal, category_id } = props
  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="dialog-panel">
        <Dialog.Title
          as="h3"
          className="dialog-title"
        >
          <MdWarningAmber className="w-5 h-5 text-red-500" /> 
          <span>Do you wish to proceed?</span>
        </Dialog.Title>
        <div css={styles.message}>
          <p>
            Once you proceed to this exam, you will never gonna retake the exam again.
          </p>
        </div>

        <div css={tw`mt-4 flex justify-end`}>
          <Link href={`/categories/questions/${category_id}`}>
            <a className="btn-primary" css={styles.a}>
              <RiUserSharedLine className="w-4 h-4 text-white" />
              <span>Take the quiz</span>
            </a>
          </Link>
        </div>
      </Dialog.Panel>
    </DialogBox>
  )
}

export default LessonConfirmationDialog
