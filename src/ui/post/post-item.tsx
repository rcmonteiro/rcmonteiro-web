import type { Project } from '@/core/entities/project'
import type { Id } from '@/shared/domain/entities/types/id'
import type { PostRelated } from '@/shared/domain/entities/value-objects/post-related'
import type { Slug } from '@/shared/domain/entities/value-objects/slug'
import Link from 'next/link'
import { PostExcerpt } from './post-excerpt'
import { PostProject } from './post-project'
import { PostTags } from './post-tags'
import { PostTitle } from './post-title'

export interface IPostItem {
  post: {
    id: Id
    slug: Slug
    project: Project
    updatedAt: Date
    related: PostRelated
    title: string
    tags: string[]
    excerpt: string
  }
}

export const PostItem = ({ post }: IPostItem) => {
  return (
    <div className="border-b-1 border-base" data-testid="post-item">
      <PostProject project={post.project.title} date={post.updatedAt} />
      <Link className="no-underline" href={`/post/${post.slug._value}`}>
        <PostTitle>{post.title}</PostTitle>
      </Link>
      <PostTags>{post.tags}</PostTags>
      <Link className="no-underline" href={`/post/${post.id}`}>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
      </Link>
    </div>
  )
}
