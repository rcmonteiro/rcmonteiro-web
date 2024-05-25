import { Post } from '@/domain/entities/post'
import { Project } from '@/domain/entities/project'
import { PostRelated } from '@/domain/entities/value-objects/post-related'
import { Slug } from '@/domain/entities/value-objects/slug'

export interface IRawPost {
  title: string
  fileName: string
  content: string
  excerpt: string
  project: string
  updatedAt: string
  tags: string[]
  repoUrl: string
  next?: string
  prev?: string
}

export class PostMapper {
  public static toDomain(raw: IRawPost): Post {
    return Post.create({
      title: raw.title,
      slug: Slug.create(raw.fileName),
      body: raw.content,
      excerpt: raw.excerpt,
      updatedAt: new Date(raw.updatedAt),
      project: new Project({
        title: raw.project,
        repoUrl: raw.repoUrl,
      }),
      related: new PostRelated({
        prev: raw.prev,
        next: raw.next,
      }),
      tags: raw.tags,
    })
  }
}
