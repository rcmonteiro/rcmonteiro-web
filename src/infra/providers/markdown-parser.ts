import matter, { type GrayMatterFile } from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface ParsedMarkdown {
  title: string
  content: string
  excerpt: string
  project: string
  updatedAt: string
  tags: string[]
  repoUrl: string
  next?: string
  prev?: string
}

export class MarkdownParser {
  public static async parse(
    fileContents: string,
  ): Promise<{ data: Partial<ParsedMarkdown> }> {
    const { data: parsedData, content }: GrayMatterFile<string> =
      matter(fileContents)

    if (!parsedData.title) {
      throw new Error('Invalid markdown file: Missing required metadata')
    }

    const htmlText = await remark().use(html).process(content)
    // const regex = /(#.*?)(\n|$)/g

    // const highlightedText = htmlText
    //   .toString()
    //   .replace(regex, `<span>$1</span>$2`)

    return {
      data: {
        content: htmlText.toString(),
        ...parsedData,
      },
    }
  }
}
