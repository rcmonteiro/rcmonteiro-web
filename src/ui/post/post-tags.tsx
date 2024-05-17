import { title2slug } from '@/shared/title-to-slug'
import Link from 'next/link'

interface IPostTags {
  children: string[]
}

export const PostTags = ({ children }: IPostTags) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {children.map((tag) => {
        return (
          <Link
            key={tag}
            href={`/${title2slug(tag)}`}
            className="text-highlight no-underline hover:underline underline-offset-8"
          >
            #{tag}
          </Link>
        )
      })}
    </div>
  )
}
