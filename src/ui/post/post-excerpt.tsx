interface IPostExcerpt {
  children: string
}

export const PostExcerpt = ({ children }: IPostExcerpt) => {
  return <p className="text-md text-dark-100">{children}</p>
}
