import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/ui/Loader"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById } from "@/lib/react-query/queriesAndMutations"
import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { LikedPosts } from "."

const Profile = () => {
  const { id } = useParams()
  const { user } = useUserContext()
  const { pathname } = useLocation()

  const { data: currentUser, isLoading } = useGetUserById(id || "")

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img src={currentUser?.imageUrl} alt="profile" className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{currentUser?.name}</h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser?.username}
              </p>
            </div>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <div className="flex-center gap-2">
                <p className="small-semibold lg:body-bold text-primary-500">{currentUser?.posts.length}</p>
                <p className="small-medium lg:base-medium text-light-2">Posts</p>
              </div>
              <div className="flex-center gap-2">
                <p className="small-semibold lg:body-bold text-primary-500">0</p>
                <p className="small-medium lg:base-medium text-light-2">Followers</p>
              </div>
              <div className="flex-center gap-2">
                <p className="small-semibold lg:body-bold text-primary-500">0</p>
                <p className="small-medium lg:base-medium text-light-2">Following</p>
              </div>
            </div>
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser?.bio}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <div className={`${user.id !== id && "hidden"}`}>
              <a
                className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg false"
                href="/update-profile/659e199b89937a81959e"
              >
                <img src="/assets/icons/edit.svg" alt="edit" width="20" height="20" />
                <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
              </a>
            </div>

            <div className={`${user.id === id && "hidden"}`}>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 py-2 shad-button_primary px-8"
                type="button"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-5xl w-full">
        <Link
          to={`/profile/${id}`}
          className={`profile-tab rounded-l-lg ${pathname === `/profile/${id}` && "!bg-dark-3"}`}
        >
          <img src={"/assets/icons/posts.svg"} alt="posts" width={20} height={20} />
          Posts
        </Link>
        <Link
          to={`/profile/${id}/liked-posts`}
          className={`profile-tab rounded-r-lg ${pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"}`}
        >
          <img src={"/assets/icons/like.svg"} alt="like" width={20} height={20} />
          Liked Posts
        </Link>
      </div>

      <Routes>
        <Route index element={<GridPostList posts={currentUser?.posts} showUser={false} />} />
        {<Route path="/liked-posts" element={<LikedPosts posts={currentUser?.liked} />} />}
      </Routes>
      <Outlet />
    </div>
  )
}

export default Profile
