import type { Post } from '../../modules/blog/post'

export interface PostRepository {
  getPostBySlug(slug: string): Promise<Post | null>
  fetchRecentPosts(limit: number): Promise<Post[]>
  fetchPostsByTag(tag: string): Promise<Post[]>
  fetchPostSlugs(): Promise<{ slug: string }[]>
}
