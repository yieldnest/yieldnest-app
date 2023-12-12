import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Loader } from 'lucide-react'

import type { ForwardedRef, ReactElement, ReactNode } from 'react'

export type	TButton = {
	children: ReactNode,
	shouldStopPropagation?: boolean,
	isBusy?: boolean,
	isDisabled?: boolean,
} & React.ComponentPropsWithoutRef<'button'>

export type TMouseEvent = React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>;

// eslint-disable-next-line react/display-name
const ButtonTx = forwardRef((props: TButton, ref: ForwardedRef<HTMLButtonElement | null>): ReactElement => {
  const	{children, shouldStopPropagation = false, isBusy = false, isDisabled = false, ...rest} = props

  return (
    <button
      {...(rest as React.ComponentPropsWithoutRef<'button'>)}
      ref={ref}
      className={cn(`${rest.className}`, isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
      aria-busy={isBusy}
      disabled={isDisabled || (rest as React.ComponentPropsWithoutRef<'button'>).disabled}
      onClick={(event: TMouseEvent): void => {
        if (shouldStopPropagation) {
          event.stopPropagation()
        }
        if (!isBusy && rest.onClick) {
          rest.onClick(event)
        }
      }}>
      {children}
      {isBusy ? (
        <div className={'flex items-center justify-center'}>
          <Loader className={'h-6 w-6 animate-spin-slow '} />
        </div>
      ) : null}
    </button>
  )
})

export { ButtonTx }
