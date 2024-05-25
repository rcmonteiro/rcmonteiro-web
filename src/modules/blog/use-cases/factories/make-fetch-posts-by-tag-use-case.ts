import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { FetchPostsByTagUseCase } from '../fetch-posts-by-tag'

export const makeFetchPostsByTagUseCase = () => {
  const postRepository = new FilePostRepository()
  const fetchPostsByTag = new FetchPostsByTagUseCase(postRepository)

  return fetchPostsByTag
}
