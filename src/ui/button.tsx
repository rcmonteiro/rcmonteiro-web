import type { ComponentProps, ReactNode } from 'react'

type TButtonLink = ComponentProps<'a'> & {
  children: ReactNode
}

export const ButtonLink = ({ children, href, ...props }: TButtonLink) => {
  return (
    <a
      href={href}
      {...props}
      className="flex no-underline gap-2 hover:ring-main/70 items-center whitespace-nowrap h-8 px-3 leading-8 rounded-full bg-main text-default ring-4 ring-main/20"
    >
      {children}
    </a>
  )
}
