'use client'

import React, { createContext, useContext, useState } from 'react'

interface ModalContextType {
  isGetStartedModalOpen: boolean
  openGetStartedModal: () => void
  closeGetStartedModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false)

  const openGetStartedModal = () => setIsGetStartedModalOpen(true)
  const closeGetStartedModal = () => setIsGetStartedModalOpen(false)

  return (
    <ModalContext.Provider
      value={{
        isGetStartedModalOpen,
        openGetStartedModal,
        closeGetStartedModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}