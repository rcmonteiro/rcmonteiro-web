import { Post } from '@/modules/blog/entities/post'
import { Project } from '@/modules/blog/entities/project'
import { PostRelated } from '@/shared/domain/entities/value-objects/post-related'
import { Slug } from '@/shared/domain/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export const makePost = (override: Partial<Post> = {}): Post => {
  return Post.create({
    title: faker.lorem.sentence(5),
    slug: Slug.createFromText(faker.lorem.sentence(5)),
    body: faker.lorem.paragraph(3),
    excerpt: faker.lorem.paragraph(1),
    updatedAt: faker.date.recent(),
    project: new Project({
      title: faker.lorem.sentence(10),
      repoUrl: faker.internet.domainName(),
    }),
    related: new PostRelated({
      prev: Slug.createFromText(faker.lorem.sentence(5))._value,
      next: Slug.createFromText(faker.lorem.sentence(5))._value,
    }),
    tags: [],
    ...override,
  })
}
