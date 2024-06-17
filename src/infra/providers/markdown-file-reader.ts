import { getSlugFromFileName } from '@/shared/get-slug-from-filename'
import matter, { type GrayMatterFile } from 'gray-matter'
import * as fs from 'node:fs'

export class MarkdownFileReader {
  public static async parseFile<T>(filePath: string): Promise<T | null> {
    if (!fs.existsSync(filePath)) {
      return null
    }
    const fileName = getSlugFromFileName(filePath)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content }: GrayMatterFile<string> = matter(fileContents)
    // const htmlText = await remark().use(html).process(content)
    return {
      ...data,
      fileName,
      content,
    } as T
  }

  public static parseDirectory(directoryPath: string): string[] {
    const fileNames = fs.readdirSync(directoryPath)
    return fileNames
  }
}
