import { Post } from '@/domain/entities/post'
import type { PostRepository } from '@/domain/repositories/post-repository'

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = []

  async getPostBySlug(slug: string): Promise<Post | null> {
    const post = this.items.find((post) => post.id === slug)
    return post ?? null
  }

  async fetchRecentPosts(limit: number): Promise<Post[]> {
    const posts = this.items
      .slice(0, limit)
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    return posts
  }

  async fetchPostsByTag(tag: string): Promise<Post[]> {
    const posts = this.items
      .filter((post) => post.tags.includes(tag))
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    return posts
  }

  async fetchPostSlugs(): Promise<{ slug: string }[]> {
    const postSlugs = this.items.map((post) => ({
      slug: post.id,
    }))
    return postSlugs
  }
}
