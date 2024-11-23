import React from "react";
import "./UserLogin.css";
import Footer from "../Footer/Footer";
const UserLogin = () => {
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {/* <!----------------------- Login Container --------------------------> */}
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {/* <!--------------------------- Left Box -----------------------------> */}
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3">
              <img src="./image/Userlogin.png" alt="logo" className="image" />
            </div>
          </div>
          {/* <!-------------------- ------ Right Box ----------------------------> */}

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Hello,Students</h2>
                <p>We are happy to have you back.</p>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Remember Me</small>
                  </label>
                </div>
                <div className="forgot">
                  <small>
                    <a href="/#">Forgot Password?</a>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6">
                  Login
                </button>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-light w-100 fs-6">
                  <small>Sign In with Google</small>
                </button>
              </div>
              <div className="row">
                <small>
                  Don't have account? <a href="/#">Sign Up</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default UserLogin;
