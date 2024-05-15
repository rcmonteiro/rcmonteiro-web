import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface ParsedMarkdown {
  title: string
  content: string
  excerpt: string
  project: string
  tags: string[]
  date: string
}

export class MarkdownParser {
  public static async parse(fileContents: string): Promise<ParsedMarkdown> {
    const { data, content } = matter(fileContents)

    if (!data.title) {
      throw new Error('Invalid markdown file: Missing required metadata')
    }

    const body = await remark().use(html).process(content)

    return {
      title: data.title,
      tags: data.tags,
      date: data.date,
      project: data.project,
      excerpt: data.excerpt,
      content: body.toString(),
    }
  }
}
