import { makePost } from '@/tests/factories/make-post'
import { InMemoryPostRepository } from '@/tests/repositories/in-memory-post-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { Post } from '../entities/post'
import { FetchRecentPostsUseCase } from './fetch-recent-posts'

let postRepository: InMemoryPostRepository
let sut: FetchRecentPostsUseCase

describe('Fetch Recent Posts Use Case (unit tests)', () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository()
    sut = new FetchRecentPostsUseCase(postRepository)
  })

  it('should be able fetch the last 5 recent posts', async () => {
    Array.from({ length: 10 }).forEach(() => {
      postRepository.items.push(makePost())
    })
    const result = await sut.execute({ limit: 5 })

    expect(result).toHaveLength(5)
    expect(result[2]).toBeInstanceOf(Post)
  })
})
