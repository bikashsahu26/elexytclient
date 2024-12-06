import React from "react";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/course">
          {/* <FaHome /> */}
          <h4
            className="ps-3 logo-e"
            //  onClick={handleLogoClick}
          >
            <span className="custom-e">E</span>
            <span className="custom-letter">lexyt</span>
          </h4>
        </a>
        <div className="center-items">
          <a className="justify-content-center" href="/course">
            Course
          </a>
          <a href="/courseCategory">Category</a>
          <a href="/courseSubcategory">SubCategory</a>
          <a href="/education">Education</a>
        </div>
      </div>

      <div className="d-flex ms-auto">
        <div className="btn-group">
          <div
            className="dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer" }}
          >
            <CgProfile className="profile-icon" size={20} />
          </div>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="/profile">
                My Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Help
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/login">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
