import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { FetchRecentPostsUseCase } from '../fetch-recent-posts'

export const makeFetchRecentPostsUseCase = () => {
  const postRepository = new FilePostRepository()
  const fetchRecentPosts = new FetchRecentPostsUseCase(postRepository)

  return fetchRecentPosts
}
