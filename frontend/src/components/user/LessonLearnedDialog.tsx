import React from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import DialogBox from './../DialogBox'
import { classNames } from '~/utils/classNames'

type Props = {
  isOpen: boolean
  closeModal: () => void
  lessons: any[]
}

const LessonLearnedDialog: React.FC<Props> = (props) => {
  const { isOpen, closeModal, lessons } = props
  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className={classNames(
        'w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6',
        'text-left align-middle shadow-xl transition-all'
      )}>
        <Dialog.Title
          as="h3"
          className="flex items-center space-x-3 text-xl font-bold leading-6 text-gray-800"
        >
          <span>Topics learned</span>
        </Dialog.Title>
        <div className="mt-4 divide-y">
          <>
            {lessons?.map((lesson, lIdx) => (
              <div key={lIdx}>
                {lesson?.answers.map((answer: any, index: number) => {
                  const getCatTitle = answer.question.category.title
                  const is_correct = answer.question.choice_id == answer.choice_id
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center space-x-2 py-2">
                        <label className="text-base font-semibold">{`${index+1}. ${answer?.question.value}`}</label>
                        <div className={classNames(
                            'flex items-center px-1 py-0.5',
                            'rounded-full space-x-1 text-white',
                            is_correct ? 'bg-green-500' : 'bg-red-500'
                          )}>
                          {is_correct ? <BsFillCheckCircleFill className="w-4 h-4"/> : <AiFillCloseCircle className="w-4 h-4"/>}
                          <span className="text-xs font-medium">{is_correct ? 'Correct' : 'Wrong'}</span>
                        </div>
                        <span className="font-light text-white italic text-sm bg-blue-500 rouded-full rounded-full px-1">{getCatTitle}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </>
        </div>
      </Dialog.Panel>
    </DialogBox>
  )
}

export default LessonLearnedDialog
