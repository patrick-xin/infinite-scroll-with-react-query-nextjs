const PostCardLoader = () => {
  return (
    <div className="grid-col-1 mx-auto my-8 grid gap-6 lg:grid-cols-2">
      {Array.from(Array(2).keys()).map((_, index) => (
        <Loader key={index} />
      ))}
    </div>
  )
}

export default PostCardLoader

const Loader = () => {
  return (
    <div className="flex h-[30rem] w-[28rem] flex-col justify-center rounded-md border border-white/10 bg-white p-6 shadow-lg">
      <div className="flex animate-pulse space-x-8">
        <div className="flex-1 space-y-10 py-1">
          <div className="h-4 w-3/4 rounded bg-black/20" />
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-black/20" />
            <div className="h-4 w-1/3 rounded bg-black/20" />
            <div className="h-4 w-1/4 rounded bg-black/20" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-black/20" />
            <div className="h-4 w-full rounded bg-black/20" />
            <div className="h-4 w-full rounded bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
