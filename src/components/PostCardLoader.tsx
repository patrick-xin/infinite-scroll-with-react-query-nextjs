const PostCardLoader = () => {
  return (
    <div className="mx-auto grid grid-cols-2 place-items-center gap-6">
      {Array.from(Array(4).keys()).map((_, index) => (
        <Loader key={index} />
      ))}
    </div>
  )
}

export default PostCardLoader

const Loader = () => {
  return (
    <div className="h-72 w-full max-w-sm rounded-md border border-white/10 bg-blue-400/10 px-4 py-6 shadow-lg">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 w-3/4 rounded bg-black/10"></div>
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-black/10"></div>
            <div className="h-4 w-1/3 rounded bg-black/10"></div>
            <div className="h-4 w-1/4 rounded bg-black/10"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-black/10"></div>
            <div className="h-4 w-full rounded bg-black/10"></div>
            <div className="h-4 w-full rounded bg-black/10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
