import { Post } from '@/domain/entities/post'
import { faker } from '@faker-js/faker'

export const makePost = (): Post => {
  return new Post(faker.lorem.slug(), {
    title: faker.lorem.sentence(10),
    content: faker.lorem.paragraph(3),
  })
}
