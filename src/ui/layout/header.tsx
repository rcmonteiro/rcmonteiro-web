import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/" className=" no-underline">
        <Image
          src="/rcmonteiro-logo.svg"
          alt="Logo rcmonteiro"
          height={27}
          width={187}
        />
      </Link>
      <nav className="flex justify-end gap-4 items-center">
        <Link
          href="https://www.linkedin.com/in/ricardo-monteiro/"
          aria-label="rcmonteiro's Linkedin profile"
        >
          <LinkedinLogo size={32} weight="light" />
        </Link>
        <Link
          href="https://github.com/rcmonteiro/"
          aria-label="rcmonteiro's Github profile"
        >
          <GithubLogo size={32} weight="light" />
        </Link>
      </nav>
    </header>
  )
}
