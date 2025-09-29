import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 shadow-2xl',
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                {title && (
                  <h2 className="text-xl font-semibold text-white">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-purple-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-purple-500/20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export { Modal }