interface IPostTags {
  children: string[]
}

export const PostTags = ({ children }: IPostTags) => {
  return (
    <div className="flex gap-4 mb-4">
      {children.map((tag) => {
        return (
          <span
            key={tag}
            className="py-2 px-4 rounded-full bg-main text-default"
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
