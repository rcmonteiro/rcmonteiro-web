import dayjs from 'dayjs'

interface IPostProject {
  project: string
  date: Date
}

export const PostProject = ({ project, date }: IPostProject) => {
  return (
    <div className="flex justify-between">
      <span className="text-dark-100 text-sm">{project}</span>
      <time dateTime={date.toISOString()} className="text-default text-xs">
        {dayjs(date).fromNow()}
      </time>
    </div>
  )
}
