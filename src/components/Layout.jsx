import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">{<Outlet />}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
