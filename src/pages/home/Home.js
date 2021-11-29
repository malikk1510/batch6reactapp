import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import CommonCard from "./Common-card";
import userDataContext from "../../Token.context";

const Home = () => {
  const [productsHomeData, setProductsHomeData] = useState([]);
  const userData = useContext(userDataContext);

  useEffect(() => {
    userData.setdata1("");
    getProductsApi();
  }, []);

  //get
  const getProductsApi = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token: ", token);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/get/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);
      setProductsHomeData(response.data.data);
    } catch (error) {
      console.log("error: ", error);
      // alert(error.response.data.error);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="text-center">Products</h1>
        </div>
        <div className="row d-flex p-2 ">
          {productsHomeData && productsHomeData.length !== 0
            ? productsHomeData.map((item) => {
                return <CommonCard key={item._id} productsHomeData1={item} />;
              })
            : "No data"}
        </div>
      </div>
    </>
  );
};

export default Home;
