/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import NavbarProduct from "./NavbarProduct";
import { useState } from "react";
import NavbarCustomer from "./NavbarCustomer";
import { useSelector } from "react-redux";
function Navbar() {
  let { loginType } = useSelector((state) => state.login);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar_content">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                <i className="bi bi-house"></i>
                Home Page
              </Link>
            </li>

            {loginType === "admin" ? <NavbarProduct /> : <NavbarCustomer />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
