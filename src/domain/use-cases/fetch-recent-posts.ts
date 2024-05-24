import { BlogService } from '@/services/blog-service'
import type { Post } from '../entities/post'
import type { PostRepository } from '../repositories/post-repository'

export interface FetchRecentPostsRequestDTO {
  limit: number
}

export class FetchRecentPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(requestDTO: FetchRecentPostsRequestDTO): Promise<Post[]> {
    const blogService = new BlogService(this.postRepository)
    const posts = await blogService.fetchRecentPosts(requestDTO)
    return posts
  }
}
