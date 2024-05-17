import Link from 'next/link'
import { PostExcerpt } from './post-excerpt'
import { PostProject } from './post-project'
import { PostTags } from './post-tags'
import { PostTitle } from './post-title'

export interface IPostItem {
  post: {
    id: string
    project: string
    updatedAt: Date
    title: string
    tags: string[]
    excerpt: string
  }
}

export const PostItem = ({ post }: IPostItem) => {
  return (
    <div className="border-b-1 border-base">
      <Link className="no-underline" href={`/post/${post.id}`}>
        <PostProject project={post.project} date={post.updatedAt} />
        <PostTitle>{post.title}</PostTitle>
        <PostTags>{post.tags}</PostTags>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
      </Link>
    </div>
  )
}
