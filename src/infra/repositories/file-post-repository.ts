import { Post } from '@/domain/entities/post'
import type { PostRepository } from '@/domain/repositories/post-repository'
import { slugToTitle } from '@/shared/slug-to-title'
import * as fs from 'node:fs'
import path from 'node:path'
import { MarkdownParser } from '../providers/markdown-parser'

export class FilePostRepository implements PostRepository {
  private postsDirectory = path.join(process.cwd(), '_posts')

  async getPostBySlug(slug: string): Promise<Post | null> {
    const filePath = path.join(this.postsDirectory, `${slug}.md`)
    if (!fs.existsSync(filePath)) {
      return null
    }
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = await MarkdownParser.parse(fileContents)
    return new Post(slug, data)
  }

  async fetchRecentPosts(limit: number): Promise<Post[]> {
    const slugs = fs.readdirSync(this.postsDirectory)
    const postPromises = slugs.map(async (slug) => {
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
    const slugs = fs.readdirSync(this.postsDirectory)
    const postPromises = slugs.map(async (slug) => {
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
    const postSlugs = fs.readdirSync(this.postsDirectory)
    return postSlugs.map((slug) => ({
      slug: slug.replace(/\.md$/, ''),
    }))
  }
}
