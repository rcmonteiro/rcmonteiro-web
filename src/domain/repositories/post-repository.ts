import type { Post } from '../entities/post'

export interface PostRepository {
  getPostBySlug(slug: string): Promise<Post | null>
  fetchRecentPosts(limit: number): Promise<Post[]>
  fetchPostsByTag(tag: string): Promise<Post[]>
  fetchPostSlugs(): Promise<{ slug: string }[]>
}
