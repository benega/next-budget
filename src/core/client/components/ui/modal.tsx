import React, { useRef, useState } from 'react'

type ModalProps = {
  isOpen?: boolean
  toggleModal: () => void
}

export const Modal = ({
  children,
  isOpen = false,
  toggleModal,
}: ModalProps & { children: React.ReactNode }) => {
  const backgroundRef = useRef<HTMLDivElement>(null)

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === e.target) {
      toggleModal()
    }
  }

  return isOpen ? (
    <div
      className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-400/50"
      onClick={handleBackgroundClick}
      ref={backgroundRef}
    >
      {children}
    </div>
  ) : null
}

export type ButtonModalProps = {
  button: (toggleModal: () => void) => React.ReactNode
  body: (toggleModal: () => void) => React.ReactNode
}
export const ButtonModal = ({ button, body }: ButtonModalProps) => {
  const { modalProps, toggleModal } = useModal()

  return (
    <>
      {button(toggleModal)}
      <Modal {...modalProps}>{body(toggleModal)}</Modal>
    </>
  )
}

type UseModalProps = {
  startOpen?: boolean
}
export const useModal = ({ startOpen = false }: UseModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(startOpen)

  const toggleModal = () => setIsOpen(v => !v)
  const modalProps: ModalProps = { isOpen, toggleModal }

  return {
    modalProps,
    toggleModal,
  }
}
