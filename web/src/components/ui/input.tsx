import * as React from 'react'

import { cn } from '@/lib/utils'
import { FormItem, FormLabel, FormMessage } from './form'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string
  label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, label, ...props }, ref) => {
    return (
      <FormItem>
        <FormLabel className="text-zinc-300 font-light">{label}</FormLabel>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md  text-zinc-950 border border-zinc-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <FormMessage className=" font-normal text-sm">
          {errorMessage}
        </FormMessage>
      </FormItem>
    )
  },
)
Input.displayName = 'Input'

export { Input }
