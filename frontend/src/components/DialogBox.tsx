import tw from 'twin.macro'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

const styles = {
  filter: tw`fixed inset-0 bg-black bg-opacity-25`,
  wrapper: tw`
    fixed inset-0 overflow-y-auto
    [> div]:(flex min-h-full items-center justify-center p-4 text-center)
  `
}

const DialogBox: React.FC<Props> = ({ isOpen, closeModal, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div css={styles.filter} />
        </Transition.Child>

        <div css={styles.wrapper}>
          <div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DialogBox
