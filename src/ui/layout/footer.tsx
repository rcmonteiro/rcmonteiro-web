import {
  FileArrowDown,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import exercism from '../../assets/exercism.svg'
import rocketseat from '../../assets/rocketseat.svg'

export const Footer = () => {
  return (
    <footer className="">
      <div className="flex flex-col sm:flex-row mx-4 py-8 gap-4 items-center justify-end">
        <span>
          &copy; {dayjs().year()} rcmonteiro. Open-source under the MIT License.
        </span>
        <Link
          className="text-highlight"
          href="https://github.com/rcmonteiro/rcmonteiro-web"
        >
          View source on GitHub
        </Link>
      </div>

      <nav className="flex mx-4 justify-center sm:justify-end gap-4 items-center">
        <Link
          href="/rcmonteiro-resume.pdf"
          target="_blank"
          aria-label="rcmonteiro's Resume"
        >
          <FileArrowDown size={24} weight="regular" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ricardo-monteiro/"
          target="_blank"
          aria-label="rcmonteiro's Linkedin profile"
        >
          <LinkedinLogo size={24} weight="regular" />
        </Link>
        <Link
          href="https://github.com/rcmonteiro/"
          target="_blank"
          aria-label="rcmonteiro's Github profile"
        >
          <GithubLogo size={24} weight="regular" />
        </Link>
        <Link
          href="https://x.com/rcmonteiro_dev"
          target="_blank"
          aria-label="rcmonteiro's X profile"
        >
          <XLogo size={24} weight="regular" />
        </Link>
        <Link
          href="https://app.rocketseat.com.br/me/rcmonteiro"
          target="_blank"
          aria-label="rcmonteiro's Rocketseat profile"
        >
          <Image src={rocketseat} alt="Rocketseat" height={24} width={24} />
        </Link>
        <Link
          href="https://exercism.org/profiles/rcmonteiro"
          target="_blank"
          aria-label="rcmonteiro's Exercism profile"
        >
          <Image src={exercism} alt="Exercism" height={24} width={24} />
        </Link>
      </nav>
    </footer>
  )
}
