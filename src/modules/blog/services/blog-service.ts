import type { PostRepository } from '@/modules/blog/repositories/post-repository'

export class BlogService {
  constructor(private postRepository: PostRepository) {}

  public async fetchPostSlugs(): Promise<{ slug: string }[]> {
    return await this.postRepository.fetchPostSlugs()
  }
}
