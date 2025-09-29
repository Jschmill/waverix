import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-xl transform hover:scale-105',
      secondary: 'bg-transparent border-2 border-purple-500 text-purple-100 hover:bg-purple-500/20 hover:border-purple-400',
      outline: 'border border-purple-500/30 bg-transparent text-purple-100 hover:bg-purple-500/10 hover:border-purple-400',
      ghost: 'text-purple-100 hover:bg-purple-500/10'
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm gap-2',
      md: 'h-11 px-6 text-base gap-2',
      lg: 'h-14 px-8 text-lg gap-3'
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && icon}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }