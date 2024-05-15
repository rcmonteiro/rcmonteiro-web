interface IPostTitle {
  children: string
}

export const PostTitle = ({ children }: IPostTitle) => {
  return <h2 className="text-2xl mt-0 mb-2 text-default">{children}</h2>
}
