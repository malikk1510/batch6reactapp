import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory(); // use to route bw diff components

  const [userDetails, setDetails] = useState({
    email: "",
    password: "",
  });

  //handle change
  const handleSignupChange = (e) => {
    const { name, value } = e.target; //object destructuring
    setDetails({ ...userDetails, [name]: value });
  };

  const signupApi = async () => {
    // console.log("userDetails: ", userDetails);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/signup?isAdmin=false",
        userDetails
      );
      console.log("response: ", response);
      history.push("/login");
    } catch (error) {
      console.log("error: ", error.response);
      alert(error.response.data.error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">Signup</h3>
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
                onChange={handleSignupChange}
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
                onChange={handleSignupChange}
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div>
              <button type="button" onClick={signupApi} class="btn btn-success">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
