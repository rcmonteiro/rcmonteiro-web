import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import type { ListByTagParams } from '@/infra/types/post'
import { BlogService } from '@/services/blog-service'
import { slugToTitle } from '@/shared/slug-to-title'
import { PostItem } from '@/ui/post/post-item'

export default async function List({ params }: ListByTagParams) {
  const tag = params.tag
  const blogService = new BlogService(new FilePostRepository())
  const posts = await blogService.fetchPostsByTag(tag)
  return (
    <main className="space-y-24">
      <h1 className="text-4xl font-bold">#{slugToTitle(tag)}</h1>
      <section className="space-y-8">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}
