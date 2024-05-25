import type { Post } from '@/modules/blog/entities/post'
import {
  PostMapper,
  type IRawPost,
} from '@/modules/blog/repositories/mappers/post-mapper'
import type { PostRepository } from '@/modules/blog/repositories/post-repository'
import { slugToTitle } from '@/shared/slug-to-title'
import path from 'node:path'
import { MarkdownFileReader } from '../providers/markdown-file-reader'

export class FilePostRepository implements PostRepository {
  private postsDirectory = path.join(process.cwd(), '_posts')

  async getPostBySlug(slug: string): Promise<Post | null> {
    const filePath = path.join(this.postsDirectory, `${slug}.md`)
    const parsedData = await MarkdownFileReader.parseFile<IRawPost>(filePath)
    if (!parsedData) {
      return null
    }
    return PostMapper.toDomain(parsedData)
  }

  async fetchRecentPosts(limit: number): Promise<Post[]> {
    const files = MarkdownFileReader.parseDirectory(this.postsDirectory)
    const postPromises = files.map(async (slug) => {
      const post = await this.getPostBySlug(slug.replace(/\.md$/, ''))
      if (!post) {
        throw new Error(`Post with slug ${slug} not found`)
      }
      return post
    })
    const posts = await Promise.all(postPromises)
    return posts
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
      .reverse()
      .slice(0, limit)
  }

  async fetchPostsByTag(tag: string): Promise<Post[]> {
    const files = MarkdownFileReader.parseDirectory(this.postsDirectory)
    const postPromises = files.map(async (slug) => {
      const post = await this.getPostBySlug(slug.replace(/\.md$/, ''))
      if (!post) {
        throw new Error(`Post with slug ${slug} not found`)
      }
      return post
    })
    const posts = await Promise.all(postPromises)
    return posts
      .filter((post) => post.tags.includes(slugToTitle(tag)))
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
      .reverse()
  }

  async fetchPostSlugs(): Promise<{ slug: string }[]> {
    const files = MarkdownFileReader.parseDirectory(this.postsDirectory)
    return files.map((slug) => ({
      slug: slug.replace(/\.md$/, ''),
    }))
  }
}
