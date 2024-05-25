import type { ListByTagParams } from '@/infra/dtos/post'
import { makeFetchPostsByTagUseCase } from '@/modules/blog/use-cases/factories/make-fetch-posts-by-tag-use-case'
import { slugToTitle } from '@/shared/slug-to-title'
import { PostItem } from '@/ui/post/post-item'

export default async function List({ params }: ListByTagParams) {
  const tag = params.tag
  const fetchPostsByTag = makeFetchPostsByTagUseCase()
  const posts = await fetchPostsByTag.execute({ tag })
  return (
    <main className="space-y-24">
      <h1 className="text-4xl font-bold">#{slugToTitle(tag)}</h1>
      <section className="space-y-8">
        {posts.map((post) => (
          <PostItem key={post.id.toString()} post={post} />
        ))}
      </section>
    </main>
  )
}
