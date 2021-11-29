import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory(); // use to route bw diff components

  //user initial state
  const [userDetails, setDetails] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  //handle change
  const handleLoginChange = (e) => {
    const { name, value } = e.target; //object destructuring
    setDetails({ ...userDetails, [name]: value });
  };

  const loginApi = async () => {
    // console.log("userDetails: ", userDetails);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/signin",
        userDetails
      );
      setIsLoading(false);
      toast("Login successfull!");
      console.log("response: ", response);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.data.user)
      ); //to save in localstorage we have to serialize it, means to stringfy it
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      if (response.data.data.user.role === "ADMIN") {
        history.push("/admin/home");
      } else {
        history.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error.response);
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">Login</h3>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Email
              </span>
              <input
                name="email"
                onChange={handleLoginChange}
                type="email"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Password
              </span>
              <input
                name="password"
                onChange={handleLoginChange}
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div>
              <button
                type="button"
                disabled={isLoading}
                onClick={loginApi}
                class="btn btn-success"
              >
                Login
                {isLoading && (
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
