import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import userDataContext from "../../Token.context";

const Header = () => {
  const userData = useContext(userDataContext);
  console.log("userData: ", userData);

  const history = useHistory();
  const [clear, setClear] = useState(false);

  useEffect(() => {
    console.log("calling");
    setClear(true);
  }, [JSON.parse(localStorage.getItem("token"))]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Book Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {userData.token && userData.userData?.role !== "ADMIN" && (
              <>
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                </Link>
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </>
            )}

            {!JSON.parse(localStorage.getItem("token")) && (
              <>
                {" "}
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </>
            )}

            {JSON.parse(localStorage.getItem("userDetails"))?.role ===
              "ADMIN" && (
              <Link className="nav-link" to="/admin/home">
                Admin
              </Link>
            )}
            {JSON.parse(localStorage.getItem("token")) && (
              <a
                className="nav-link"
                onClick={() => {
                  localStorage.clear();
                  setClear(true);
                  userData.setdata1("hello");
                  history.push("/login");
                }}
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
