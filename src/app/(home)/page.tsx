import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { PostService } from '@/services/post-service'
import { Hero } from '@/ui/home/hero'
import { PostItem } from '@/ui/post/post-item'

export default async function Home() {
  const postService = new PostService(new FilePostRepository())
  const posts = await postService.findRecent(10)
  return (
    <main className="space-y-24">
      <Hero />
      <section className="space-y-8">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}
