import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      {/**Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/** Sidebar Toggle (Topbar) */}
        <form className="form-inline">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>
        </form>

        {/** Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          {/** Nav Item - User Information */}

          <li className="nav-item dropdown no-arrow">
            <Link
              to=""
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                닉네임
              </span>
              <img
                className="img-profile rounded-circle"
                src={`${process.env.PUBLIC_URL}/images/undraw_profile.svg`}
                alt="프로필 이미지"
              />
            </Link>

            {/**  Dropdown - User Information */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link to="#" className="dropdown-item">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </Link>

              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      {/** End of Topbar */}
    </>
  );
}
