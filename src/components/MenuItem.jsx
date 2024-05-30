import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ id, name, link, icon, className }) => {
  return;
  <>
    <li key={id} className={`nav-item ${className}`}>
      <Link to={link} className="nav-link">
        {icon && <i className={`fas fa-${icon}`}></i>}
        {name}
      </Link>
    </li>
  </>;
};

export default MenuItem;
