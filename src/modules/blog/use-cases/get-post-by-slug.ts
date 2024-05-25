import type { Post } from '../entities/post'
import type { PostRepository } from '../repositories/post-repository'

export interface GetPostBySlugRequestDTO {
  slug: string
}

export class GetPostBySlugUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(requestDTO: GetPostBySlugRequestDTO): Promise<Post | null> {
    const post = await this.postRepository.getPostBySlug(requestDTO.slug)

    if (!post) {
      return null
    }

    return post
  }
}
