import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Footer = () => {
  return (
    <div
      className="container-fluid footer py-2 wow fadeIn"
      data-wow-delay="0.2s"
    >
      <div className="container px-1 py-1">
        <div className="row g-5">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h5 className="text-white mb-4">About Us</h5>
              <p className="mb-3 text-white">
                We are committed to providing the best services to our
                customers. Learn more about our journey and values.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex text-white flex-column">
              <h5 className="text-white mb-4">Quick Links</h5>
              <a href="/#">About</a>
              <a href="/#">Products</a>
              <a href="/#">Team</a>
              <a href="/#">Contact us</a>
              <a href="/#">Terms & Conditions</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h5 className="text-white mb-4">Teaching Hours</h5>
              <div className="mb-3">
                <h6 className="text-white mb-0">Mon - Friday:</h6>
                <p className="text-white mb-0">09.00 am to 07.00 pm</p>
              </div>
              <div className="mb-3">
                <h6 className="text-white mb-0">Saturday:</h6>
                <p className="text-white mb-0">10.00 am to 05.00 pm</p>
              </div>
              <div className="mb-3">
                <h6 className="text-white mb-0">Vacation:</h6>
                <p className="text-white mb-0">All Sunday is vacation</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column text-white">
              <h5 className="text-white mb-4">Contact Info</h5>
              <a href="/#">NO 98 ITPL, Doddanekkundi, Bangalore, India</a>
              <a href="mailto:info@example.com">info@elexyt.com</a>
              <a href="tel:+91 080 4169 2763">+91 080 4169 2763</a>
              <br />
              <div className="d-flex">
                <a
                  className="btn btn-secondary btn-md-square rounded-circle me-3"
                  href="https://www.elexyt.com/"
                >
                  <FaFacebookF />
                </a>
                <a
                  className="btn btn-secondary btn-md-square rounded-circle me-3"
                  href="https://www.elexyt.com/"
                >
                  <FaTwitter />
                </a>
                <a
                  className="btn btn-secondary btn-md-square rounded-circle me-3"
                  href="https://www.elexyt.com/"
                >
                  <CiInstagram />
                </a>
                <a
                  className="btn btn-secondary btn-md-square rounded-circle me-0"
                  href="https://www.linkedin.com/company/elexyt?trk=organization_guest_main-feed-card_feed-article-content"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <span className="text-body">
          <div class="text-center bg-dark text-white mt-4 p-1">
            <p class="mb-0 fw-bold">
              <p>
                &copy; 2024 Designed By: Elexyt Technologies Pvt.Ltd.| All
                rights reserved
              </p>
            </p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Footer;
