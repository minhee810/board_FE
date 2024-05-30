import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand --*/}
        <Link
          to="/"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">게시판</div>
        </Link>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Pages Collapse Menu -->*/}
        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </Link>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <Link to="/member/login" className="collapse-item">
                Login
              </Link>
              <Link to="/member/join" className="collapse-item">
                membership
              </Link>
            </div>
          </div>
        </li>
        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item active">
          <Link to="." className="nav-link">
            <i className="fas fa-fw fa-table"></i>
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
