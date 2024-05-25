import { makePost } from '@/tests/factories/make-post'
import { InMemoryPostRepository } from '@/tests/repositories/in-memory-post-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { Post } from '../entities/post'
import { FetchPostsByTagUseCase } from './fetch-posts-by-tag'

let postRepository: InMemoryPostRepository
let sut: FetchPostsByTagUseCase

describe('Fetch Posts by Tag Use Case (unit tests)', () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository()
    sut = new FetchPostsByTagUseCase(postRepository)
  })

  it('should be able fetch posts by tag', async () => {
    Array.from({ length: 5 }).forEach(() => {
      postRepository.items.push(makePost({ tags: ['test'] }))
    })
    Array.from({ length: 5 }).forEach(() => {
      postRepository.items.push(makePost())
    })
    const result = await sut.execute({ tag: 'test' })

    expect(result).toHaveLength(5)
    expect(result[2]).toBeInstanceOf(Post)
  })
})
