import type { Post } from '../entities/post'
import type { PostRepository } from '../repositories/post-repository'

export interface FetchRecentPostsRequestDTO {
  limit: number
}

export class FetchRecentPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(requestDTO: FetchRecentPostsRequestDTO): Promise<Post[]> {
    const posts = await this.postRepository.fetchRecentPosts(requestDTO.limit)
    return posts
  }
}
