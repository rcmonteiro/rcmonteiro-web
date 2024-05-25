import { Slug } from '@/shared/domain/entities/value-objects/slug'
import { makePost } from '@/tests/factories/make-post'
import { InMemoryPostRepository } from '@/tests/repositories/in-memory-post-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { Post } from '../entities/post'
import { GetPostBySlugUseCase } from './get-post-by-slug'

let postRepository: InMemoryPostRepository
let sut: GetPostBySlugUseCase

describe('Get Post by Slug Use Case (unit tests)', () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository()
    sut = new GetPostBySlugUseCase(postRepository)
  })

  it('should be able get post details', async () => {
    postRepository.items.push(
      makePost({ slug: Slug.createFromText('post-test') }),
    )
    const result = await sut.execute({ slug: 'post-test' })

    expect(result).toBeInstanceOf(Post)
  })
})
