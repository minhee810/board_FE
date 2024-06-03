import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isToggle, setIsToggle] = useState(false);

  const onToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div>
      <div id="page-top" className={`${isToggle ? "sidebar-toggled" : ""}`}>
        <div id="wrapper">
          <Sidebar onToggle={onToggle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">{<Outlet />}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
