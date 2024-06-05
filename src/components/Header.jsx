import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("LS_SESSION_ID");
      // setUser(null);
    } catch {}
  };
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

          {/** Nav Item - User Information true -> show  */}
          <li className={`nav-item dropdown no-arrow ${isOpen ? "show" : ""}`}>
            <Link
              to=""
              onClick={handleDropdown}
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isOpen}
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
              className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                isOpen ? "show" : ""
              }`}
              aria-labelledby="userDropdown"
            >
              <Link to="/profile" className="dropdown-item">
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Link>

              <div className="dropdown-divider"></div>
              <button
                to="/logout"
                onClick={handleLogout}
                className="dropdown-item"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
      {/** End of Topbar */}
    </>
  );
}
