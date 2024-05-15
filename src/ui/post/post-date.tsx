import dayjs from 'dayjs'

interface IPostDate {
  children: string
}

export const PostDate = ({ children }: IPostDate) => {
  return (
    <time dateTime={children} className="m-4 p-8 text-sky-300 text-2xl">
      {dayjs(children).fromNow()}
    </time>
  )
}
