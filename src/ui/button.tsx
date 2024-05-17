import type { ComponentProps, ReactNode } from 'react'

type TButtonLink = ComponentProps<'a'> & {
  children: ReactNode
}

export const ButtonLink = ({ children, href, ...props }: TButtonLink) => {
  return (
    <a
      href={href}
      {...props}
      className="flex no-underline gap-2 whitespace-break-spaces hover:ring-highlight/70 items-center px-3 py-2 justify-between leading-4 rounded-full bg-highlight text-dark-900 ring-4 ring-highlight/20"
    >
      {children}
    </a>
  )
}
