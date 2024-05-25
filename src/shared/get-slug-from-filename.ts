export const getSlugFromFileName = (filePath: string): string => {
  const regex = /\/([^/]+)\.md$/
  const match = regex.exec(filePath)
  return match ? match[1] : ''
}
