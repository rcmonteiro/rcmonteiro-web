import type { Post } from '../entities/post'
import type { PostRepository } from '../repositories/post-repository'

export interface FetchPostsByTagRequestDTO {
  tag: string
}

export class FetchPostsByTagUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(requestDTO: FetchPostsByTagRequestDTO): Promise<Post[]> {
    const posts = await this.postRepository.fetchPostsByTag(requestDTO.tag)
    return posts
  }
}
