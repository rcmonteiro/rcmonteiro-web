interface IPostBody {
  children: string
}

export const PostBody = ({ children }: IPostBody) => {
  return (
    <div
      className="sm:p-8 leading-7 rounded-lg bg-slate-700"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
