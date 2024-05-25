import { makeFetchRecentPostsUseCase } from '@/modules/blog/use-cases/factories/make-fetch-recent-posts-use-case'
import { Hero } from '@/ui/home/hero'
import { PostItem } from '@/ui/post/post-item'

export default async function Home() {
  const fetchRecentPosts = makeFetchRecentPostsUseCase()
  const posts = await fetchRecentPosts.execute({ limit: 10 })
  return (
    <main className="space-y-24">
      <Hero />
      <section className="space-y-8">
        {posts.map((post) => (
          <PostItem key={post.id.toString()} post={post} />
        ))}
      </section>
    </main>
  )
}
