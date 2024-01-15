import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type GridPostListProps = {
  posts: Models.Document[]
  showUser?: boolean
  showStats?: boolean
}

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext()

  // const postsWithImages = posts.filter((post) => post.imageUrl)

  return (
    <ul className="grid-container">
      {posts.map((post) =>
        post.imageUrl ? (
          <li key={post.$id} className="relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              <img src={post.imageUrl} alt="post" className="h-full w-full object-cover" />
            </Link>

            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center justify-start gap-2">
                  <img src={post.creator.imageUrl} alt="creator" className="h-8 w-8 rounded-full" />
                  <p className="line-clamp-1">{post.creator.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </li>
        ) : (
          <li key={post.$id} className="relative min-w-20 h-20">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              <h2 className="flex-center w-full">{post.caption}</h2>
            </Link>

            <div className="absolute bottom-0 p-5 flex-between w-full rounded-b-[24px] gap-2">
              {showUser && (
                <div className="flex items-center justify-start gap-2 z-30">
                  <img src={post.creator.imageUrl} alt="creator" className="h-8 w-8 rounded-full" />
                  <p className="line-clamp-1">{post.creator.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </li>
        )
      )}
    </ul>
  )
}

export default GridPostList
