import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/ui/Loader"
import { Models } from "appwrite"

type LikedPostProps = {
  posts: Models.Document[]
}

const LikedPosts = ({ posts }: LikedPostProps) => {
  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )

  return (
    <>
      {posts.length === 0 && <p className="text-light-4">No liked posts</p>}

      <GridPostList posts={posts} showStats={false} />
    </>
  )
}

export default LikedPosts
