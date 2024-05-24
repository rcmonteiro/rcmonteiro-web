import type { Post } from '@/domain/entities/post'
import type { PostRepository } from '@/domain/repositories/post-repository'
import type { FetchRecentPostsRequestDTO } from '@/domain/use-cases/fetch-recent-posts'

export class BlogService {
  constructor(private postRepository: PostRepository) {}

  public async getPostBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository.getPostBySlug(slug)
  }

  public async fetchRecentPosts({
    limit,
  }: FetchRecentPostsRequestDTO): Promise<Post[]> {
    return await this.postRepository.fetchRecentPosts(limit)
  }

  public async fetchPostSlugs(): Promise<{ slug: string }[]> {
    return await this.postRepository.fetchPostSlugs()
  }

  public async fetchPostsByTag(tag: string): Promise<Post[]> {
    return await this.postRepository.fetchPostsByTag(tag)
  }
}
