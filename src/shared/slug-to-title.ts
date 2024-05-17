export const slugToTitle = (slug: string) => {
  const words = slug.split('-')
  const title = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/Api /, 'API ')
    .replace(/Rabbitmq/, 'RabbitMQ')
  return title
}
