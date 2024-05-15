import type { Post } from '../entities/post'

export interface PostRepository {
  findBySlug(slug: string): Promise<Post | null>
  findRecent(limit: number): Promise<Post[]>
}
