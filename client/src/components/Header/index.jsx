import { Link } from 'react-router-dom';
import './nav.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Client Portal</h1>
          </Link>
          <p className="m-0">Get all your interactions with G&D Here.</p>
        </div>
        <div className="menu">

          <ul className="navBar">
            <li>
              {Auth.loggedIn() ? (
                <>
                  {/* //   <Link className="navItem btn btn-lg btn-info m-2" to="/me">
            //     {Auth.getProfile().data.name}'s profile
            //   </Link> */}
                  <Link className="navItem btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link className="navItem btn btn-lg btn-info m-2" to="/login">
                    Login
                  </Link>
                  {/* <Link className="navItem btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link> */}
                </>
              )}
            </li>
            {
              (!Auth.getProfile()?.data?.isAdmin) ?
                (
                  <>
                    <li>
                      <Link className="navItem" to="/">
                        User Portal
                      </Link>
                    </li>
                    <li>
                      <Link className="navItem" to="/Pickup">
                        Request Pickup
                      </Link>
                    </li>
                    <li>
                      <Link className="navItem" to="/Price">
                        Request Price
                      </Link>
                    </li>
                  </>
                ) :
                (
                  <>
                  </>
                )
            }

          </ul>

        </div>
        <div>

        </div>
      </div>
    </header>
  );
};

export default Header;
