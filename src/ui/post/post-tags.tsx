interface IPostTags {
  children: string[]
}

export const PostTags = ({ children }: IPostTags) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {children.map((tag) => {
        return (
          <span key={tag} className="text-highlight">
            #{tag}
          </span>
        )
      })}
    </div>
  )
}
