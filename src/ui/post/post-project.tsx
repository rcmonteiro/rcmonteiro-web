import dayjs from 'dayjs'

interface IPostProject {
  project: string
  date: Date
}

export const PostProject = ({ project, date }: IPostProject) => {
  return (
    <div className="flex justify-between">
      <span className="text-highlight text-sm">{project}</span>
      <span className="text-default text-xs">{dayjs(date).fromNow()}</span>
    </div>
  )
}
