interface IPostTags {
  children: string[]
}

export const PostTags = ({ children }: IPostTags) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {children.map((tag) => {
        return (
          <span
            key={tag}
            className="flex items-center whitespace-nowrap h-8 px-4 leading-8 rounded-full bg-main text-default"
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
