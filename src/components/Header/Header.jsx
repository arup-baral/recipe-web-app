import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import auth from "../../appwrite/auth";
import { setLogOut } from "../../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About Us",
      slug: "/aboutus",
      active: true,
    },
    {
      name: "Contact",
      slug: "/contact",
      active: authStatus,
    },
    {
      name: "My Meals",
      slug: "/mymeals",
      active: authStatus,
    },
    {
      name: "LogIn",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header>
      <nav>
        <div className="nav-item-container text-white mx-4">
          <NavLink to={`/`} className="no-underline text-white">
            LOGO
          </NavLink>
        </div>
        <div className="nav-item-container mr-8">
          <ul className="list-none flex items-center justify-center">
            {navLinks.map((link) =>
              link.active ? (
                <li key={link.slug}>
                  <NavLink
                    to={link.slug}
                    className={({ isActive }) =>
                      `${isActive ? 'text-yellow-300 font-bold' : 'text-white'} text-center no-underline rounded py-1 px-3 hover:bg-white hover:text-blue-800`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <NavLink
                  className="no-underline text-center rounded text-white py-1 px-3 hover:bg-white hover:text-blue-800"
                  onClick={() => {
                    dispatch(setLogOut());
                    auth.logOut();
                  }}
                >
                  LogOut
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
