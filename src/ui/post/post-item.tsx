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
    <div className="border-b-1 border-base" data-testid="post-item">
      <PostProject project={post.project} date={post.updatedAt} />
      <Link className="no-underline" href={`/post/${post.id}`}>
        <PostTitle>{post.title}</PostTitle>
      </Link>
      <PostTags>{post.tags}</PostTags>
      <Link className="no-underline" href={`/post/${post.id}`}>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
      </Link>
    </div>
  )
}
