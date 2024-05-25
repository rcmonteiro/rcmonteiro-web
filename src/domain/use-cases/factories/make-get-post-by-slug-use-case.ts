import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { GetPostBySlugUseCase } from '../get-post-by-slug'

export const makeGetPostBySlugUseCase = () => {
  const postRepository = new FilePostRepository()
  const fetchPostsByTag = new GetPostBySlugUseCase(postRepository)

  return fetchPostsByTag
}
