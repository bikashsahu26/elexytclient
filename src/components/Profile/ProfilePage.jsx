import React, { useState } from "react";
import "./ProfilePage.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
const ProfilePage = () => {
  const [selectedSideBar, setselectedSideBar] = useState("courses"); // Default is "courses"
  const handleCategoryChange = (category) => {
    setselectedSideBar(category);
  };

  // dynamic content based on the selected category of side bar
  const getSidebarContent = () => {
    switch (selectedSideBar) {
      default:
      case "profile":
        return (
          <>
            <h3 className="mb-4">My Profile</h3>
          </>
        );
      case "webinars":
        return (
          <>
            <h3 className="mb-4">My Webinars</h3>
            <div className="row"> {/* Display Webinars Content here */} </div>
          </>
        );
      case "certificates":
        return (
          <>
            <h3 className="mb-4">My Certificates</h3>
            <div className="row">
              {" "}
              {/* Display Certificates Content here */}{" "}
            </div>
          </>
        );

      case "events":
        return (
          <>
            <h3 className="mb-4">My Events</h3>
            <div className="row"> {/* Display Events Content here */} </div>
          </>
        );
      case "offers":
        return (
          <>
            <h3 className="mb-4">My Offers</h3>
            <div className="row"> {/* Display Offers Content here */} </div>
          </>
        );
      case "support":
        return (
          <>
            <h3 className="mb-4">For Support</h3>
          </>
        );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="container my-4">
          {/* Sidebar and Main Content Wrapper */}
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center p-3 sidebar-card">
                <div className="profile-pic mb-3">
                  <img
                    src="../images/courses.png"
                    alt="User"
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <h5 className="mb-3">Bikash Kumar Sahu</h5>
                <ul className="list-unstyled ms-5 text-start sidebar-list">
                  <li className="mb-4">
                    <a
                      href="#profile"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("profile")}
                    >
                      <i className="bi bi-mortarboard-fill me-2"></i> My Profile
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#webinars"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("webinars")}
                    >
                      <i className="bi bi-calendar-event-fill me-2"></i> My
                      Webinars
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#certificates"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("certificates")}
                    >
                      <i className="bi bi-award-fill me-2"></i> My Certificates
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#events"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("events")}
                    >
                      <i className="bi bi-calendar-week-fill me-2"></i> My
                      Events
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="#offers"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("offers")}
                    >
                      <i className="bi bi-tag-fill me-2"></i> My Offers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#support"
                      className="text-decoration-none text-dark"
                      onClick={() => handleCategoryChange("support")}
                    >
                      <i className="bi bi-question-circle-fill me-2"></i>{" "}
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-12 col-md-9">
              {getSidebarContent()}{" "}
              {/* Display content based on selected category */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
