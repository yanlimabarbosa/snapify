import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { INITIAL_USER, useUserContext } from "@/context/AuthContext"
import { sidebarLinks } from "@/constants"
import { INavLink } from "@/types"
import { Button } from "../ui/button"
import Loader from "../ui/Loader"

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { mutate: signOut } = useSignOutAccount()
  const { user, setUser, setIsAuthenticated } = useUserContext()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signOut()
    setIsAuthenticated(false)
    setUser(INITIAL_USER)
    navigate("/sign-in")
  }

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>

        {!user.name ? (
          <Loader />
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 item-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded full"
            />
            <div className="flex-col">
              <p className="body-bold">{user.username ? `@${user.name}` : "Get Started!"}</p>
              <p className="small-regular text-light-3">
                {user.username ? (
                  `@${user.name}`
                ) : (
                  <>
                    Go back and create an account or log in <br />
                    to access personalized content and features.
                  </>
                )}
              </p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            return (
              <li key={link.route} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                <NavLink to={link.route} className="flex gap-4 item-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">{user.name ? "Logout" : "Go back"}</p>
      </Button>
    </nav>
  )
}
export default LeftSidebar
