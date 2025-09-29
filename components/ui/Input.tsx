import React, { forwardRef } from 'react'
import { cn, generateId } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, ...props }, ref) => {
    const [inputId, setInputId] = React.useState(id || '')
    
    React.useEffect(() => {
      if (!id) {
        setInputId(generateId('input'))
      }
    }, [id])
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-purple-100"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full rounded-lg border border-purple-500/30 bg-slate-800/50 px-4 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-400',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const [textareaId, setTextareaId] = React.useState(id || '')
    
    React.useEffect(() => {
      if (!id) {
        setTextareaId(generateId('textarea'))
      }
    }, [id])
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-sm font-medium text-purple-100"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border border-purple-500/30 bg-slate-800/50 px-4 py-3 text-sm text-white ring-offset-background placeholder:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-red-500 focus-visible:ring-red-400',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, id, options, placeholder, ...props }, ref) => {
    const [selectId, setSelectId] = React.useState(id || '')
    
    React.useEffect(() => {
      if (!id) {
        setSelectId(generateId('select'))
      }
    }, [id])
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={selectId}
            className="text-sm font-medium text-purple-100"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-lg border border-purple-500/30 bg-slate-800/50 px-4 py-2 text-sm text-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-400',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-purple-300">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-slate-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Input, Textarea, Select }