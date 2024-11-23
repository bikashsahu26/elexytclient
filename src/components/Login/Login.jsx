import React from "react";
import "../Login/Login.css";
import Footer from "../Footer/Footer";
const Login = () => {
  return (
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 ">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card card1 ">
                <div className="row">
                  <img src="./image/logo1.png" alt="logo" className="logo" />
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 ">
                  <img
                    src="./image/remote1.png"
                    alt="E-Learning"
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card2  px-4 py-5">
                <form>
                  <div className="row mb-3 px-3">
                    <h5 className="mb-0 mr-4 mt-2">Login</h5>
                  </div>
                  <div className="row px-3 mb-4">
                    <hr />
                  </div>
                  <div className="row px-3">
                    <label className="mb-2">
                      <h6 className="mb-2 text-sm">Email Address</h6>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter a valid email address"
                      />
                    </label>
                  </div>
                  <div className="row px-3">
                    <label className="mb-2">
                      <h6 className="mb-2 text-sm">Password</h6>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                      />
                    </label>
                  </div>
                  <div className="row px-3 mb-4">
                    <a href="/forgot-password" className="ml-auto mb-0 text-sm">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="row mb-3 px-3">
                    <a href="/course">
                      <button
                        type="button"
                        className="btn btn-blue text-center"
                      >
                        Login
                      </button>
                    </a>
                  </div>
                </form>
                <div className="row mb-4 px-3">
                  <small className="font-weight-bold">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-danger">
                      Register
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
