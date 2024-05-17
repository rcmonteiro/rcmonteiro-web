import { slugToTitle } from '@/shared/slug-to-title'
import { truncateText } from '@/shared/truncate-text'
import {
  CaretCircleLeft,
  CaretCircleRight,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ButtonLink } from '../button'

interface IPostFooter {
  repoUrl: string
  next?: string
  prev?: string
}

export const PostFooter = ({ repoUrl, next, prev }: IPostFooter) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mb-8">
        <div>
          {prev && (
            <Link href={prev} passHref legacyBehavior>
              <ButtonLink>
                <CaretCircleLeft size={24} />
                {truncateText(slugToTitle(prev), 24)}
              </ButtonLink>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={next} passHref legacyBehavior>
              <ButtonLink>
                {truncateText(slugToTitle(next), 24)}
                <CaretCircleRight size={24} />
              </ButtonLink>
            </Link>
          )}
        </div>
      </div>
      <div className="border-t-2 border-dark-100 px-8">
        <h2>Contribute to the Project</h2>
        <p>
          If you found this post helpful or have suggestions for improvement,
          feel free to check out the{' '}
          <Link href={repoUrl}>project repository on GitHub</Link>. You are
          welcome to fork the repository and submit a pull request. If you have
          any questions or want to discuss a topic, please open an issue. We
          appreciate your contributions!
        </p>
      </div>
    </>
  )
}
