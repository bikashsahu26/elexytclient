import React from "react";
import "./Signup.css";
import Footer from "../Footer/Footer";

const Signup = () => {
  return (
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card card1 ">
                <div className="row">
                  <img src="./image/logo1.png" alt="logo" className="logo" />
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 ">
                  <img
                    src="./image/laptop-2298286_1920.png"
                    alt="E-Learning"
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className=" card card2 border-0 px-4 py-5">
                <form>
                  <div className="row mb-4 px-3">
                    <h6 className="mb-0 mr-4 mt-2 ">Sign up</h6>
                  </div>
                  <div className="row px-3 mb-4">
                    <hr />
                  </div>{" "}
                  <div className="row px-3">
                    <label className="mb-3">
                      <h6 className="mb-3 text-sm">Email Address</h6>
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
                    <label className="mb-3">
                      <h6 className="mb-3 text-sm">Password</h6>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                      />
                    </label>
                  </div>{" "}
                  <div className="row px-3">
                    <label className="mb-3">
                      <h6 className="mb-3 text-sm">Conferm Password</h6>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                      />
                    </label>
                  </div>
                  <div className="row mb-3 px-3">
                    <a href="/login">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        CREATE
                      </button>
                    </a>
                  </div>
                  <div className="d-flex justify-content-between text-start">
                    <div className="text-end mt-3">
                      I have an account?{" "}
                      <a href="/login" className="text-primary">
                        Login
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
