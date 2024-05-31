import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          to="/"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <FontAwesomeIcon icon={faFaceLaughWink} size="xl" />
          </div>
          <div className="sidebar-brand-text mx-3">게시판</div>
        </Link>
        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Pages Collapse Menu -->*/}
        <li className="nav-item">
          <Link
            onClick={handleDropdown}
            to="#"
            className={`nav-link ${isOpen ? "collapsed" : ""}`}
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded={isOpen}
            aria-controls="collapsePages"
          >
            <FontAwesomeIcon icon={faFolder} style={{ marginRight: "4px" }} />
            <span>Pages</span>
          </Link>
          <div
            id="collapsePages"
            className={`collapse ${isOpen ? "show" : ""}`}
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <Link to="/login" className="collapse-item">
                Login
              </Link>
              <Link to="/join" className="collapse-item">
                membership
              </Link>
            </div>
          </div>
        </li>

        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item active">
          <Link to="." className="nav-link">
            <FontAwesomeIcon icon={faTable} style={{ marginRight: "4px" }} />
            <span>Tables</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
        {/*<!-- Sidebar Toggler (Sidebar) -->*/}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
}
