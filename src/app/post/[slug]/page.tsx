import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { PostService } from '@/services/post-service'
import { PostBody } from '@/ui/post/post-body'
import { PostProject } from '@/ui/post/post-project'
import { PostTags } from '@/ui/post/post-tags'
import { PostTitle } from '@/ui/post/post-title'
import { notFound } from 'next/navigation'
import * as fs from 'node:fs'
import { join } from 'node:path'

export async function generateStaticParams() {
  const postsDirectory = join(process.cwd(), '_posts')
  const postSlugs = fs.readdirSync(postsDirectory)
  return postSlugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const postService = new PostService(new FilePostRepository())
  const post = await postService.findBySlug(slug)

  if (!post) {
    return notFound()
  }

  return (
    <main>
      <PostProject project={post.project} date={post.date} />
      <PostTitle>{post.title}</PostTitle>
      <PostTags>{post.tags}</PostTags>
      <PostBody>{post.body}</PostBody>
    </main>
  )
}
