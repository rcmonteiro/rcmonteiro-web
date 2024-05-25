import { env } from '@/env'
import type { GetPostParams } from '@/infra/dtos/post'
import { FilePostRepository } from '@/infra/repositories/file-post-repository'
import { BlogService } from '@/modules/blog/services/blog-service'
import { makeGetPostBySlugUseCase } from '@/modules/blog/use-cases/factories/make-get-post-by-slug-use-case'
import { PostBody } from '@/ui/post/post-body'
import { PostFooter } from '@/ui/post/post-footer'
import { PostProject } from '@/ui/post/post-project'
import { PostTags } from '@/ui/post/post-tags'
import { PostTitle } from '@/ui/post/post-title'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const blogService = new BlogService(new FilePostRepository())

export async function generateStaticParams() {
  return await blogService.fetchPostSlugs()
}

export async function generateMetadata({
  params,
}: GetPostParams): Promise<Metadata> {
  const slug = params.slug

  const getPostBySlug = makeGetPostBySlugUseCase()
  const post = await getPostBySlug.execute({ slug })

  if (!post) {
    return notFound()
  }

  return {
    title: post.title,
    description: post.excerpt,
    metadataBase: new URL(env.APP_URL),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      tags: post.tags.flat(),
      type: 'article',
      siteName: 'rcmonteiro',
    },
  }
}

export default async function Post({ params }: GetPostParams) {
  const slug = params.slug
  const getPostBySlug = makeGetPostBySlugUseCase()
  const post = await getPostBySlug.execute({ slug })
  if (!post) {
    return notFound()
  }

  return (
    <main>
      <PostProject project={post.project.title} date={post.updatedAt} />
      <PostTitle>{post.title}</PostTitle>
      <PostTags>{post.tags}</PostTags>
      <PostBody>{post.body}</PostBody>
      <PostFooter
        repoUrl={post.project.repoUrl.value}
        next={post.related.next}
        prev={post.related.prev}
      />
    </main>
  )
}
