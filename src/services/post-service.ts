import type { Post } from '@/domain/entities/post'
import type { PostRepository } from '@/domain/repositories/post-repository'

export class PostService {
  constructor(private postRepository: PostRepository) {}

  public async findBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository.findBySlug(slug)
  }

  public async findRecent(limit: number): Promise<Post[]> {
    return await this.postRepository.findRecent(limit)
  }
}
