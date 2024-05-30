import { Link } from "react-router-dom";

export default function Sidebar2() {
  const menuItems = [
    { id: 1, name: "Pages", link: "/" },
    { id: 2, name: "Tables", link: "/" },
  ];

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
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">게시판</div>
        </Link>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {menuItems.map((item) => (
          <li key={item.id} className="nav-item active">
            <Link className="nav-link" to={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
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
