import type { PostRepository } from '@/domain/repositories/post-repository'

export class BlogService {
  constructor(private postRepository: PostRepository) {}

  public async fetchPostSlugs(): Promise<{ slug: string }[]> {
    return await this.postRepository.fetchPostSlugs()
  }
}
