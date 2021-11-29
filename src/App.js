import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PrimaryRoutes from "./primary-routes/primary-routes";
import Footer from "./shared/Footer/Footer";
import Header from "./shared/header/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDataContext from "./Token.context";
toast.configure();

function App() {
  const [data1, setdata1] = useState({});

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        {/* <UserDataContext.Provider
          value={{
            token: JSON.parse(localStorage.getItem("token")),
            userData: JSON.parse(localStorage.getItem("userDetails")),
            setdata1,
          }}
        > */}
          <Header />
          <PrimaryRoutes />
          <Footer />
        {/* </UserDataContext.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
