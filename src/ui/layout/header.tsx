import {
  FileArrowDown,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import exercism from '../../assets/exercism.svg'
import rocketseat from '../../assets/rocketseat.svg'

export const Header = () => {
  return (
    <header className="flex justify-around sm:justify-between items-center flex-col sm:flex-row">
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
          href="/rcmonteiro-resume.pdf"
          target="_blank"
          aria-label="rcmonteiro's Resume"
        >
          <FileArrowDown size={32} weight="regular" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ricardo-monteiro/"
          target="_blank"
          aria-label="rcmonteiro's Linkedin profile"
        >
          <LinkedinLogo size={32} weight="regular" />
        </Link>
        <Link
          href="https://github.com/rcmonteiro/"
          target="_blank"
          aria-label="rcmonteiro's Github profile"
        >
          <GithubLogo size={32} weight="regular" />
        </Link>
        <Link
          href="https://x.com/rcmonteiro_dev"
          target="_blank"
          aria-label="rcmonteiro's X profile"
        >
          <XLogo size={32} weight="regular" />
        </Link>
        <Link
          href="https://app.rocketseat.com.br/me/rcmonteiro"
          target="_blank"
          aria-label="rcmonteiro's Rocketseat profile"
        >
          <Image src={rocketseat} alt="Rocketseat" height={32} width={32} />
        </Link>
        <Link
          href="https://exercism.org/profiles/rcmonteiro"
          target="_blank"
          aria-label="rcmonteiro's Exercism profile"
        >
          <Image src={exercism} alt="Exercism" height={32} width={32} />
        </Link>
      </nav>
    </header>
  )
  //
  //
}
