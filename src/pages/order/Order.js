import axios from "axios";
import React, { useState, useEffect } from "react";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getOrdersApi();
  }, []);

  useEffect(() => {
    console.log("orderData: ", orderData);
  }, [orderData]);

  //get
  const getOrdersApi = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token: ", token);
    try {
      const response = await axios.get("http://localhost:4000/api/my/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("myorderresponse: ", response);
      setOrderData(response.data.data);
    } catch (error) {
      console.log("error: ", error);
      //   alert(error.response.data.error);
    }
  };
  return (
    <>
      <div className="container">
        <div>
          <h1 className="text-center">Orders</h1>
        </div>
        <div className="row d-flex p-2 ">
          {orderData && orderData.length !== 0
            ? orderData.map((item) => {
                return (
                  <div className="card m-1" style={{ width: "18rem" }}>
                    <img
                      src="https://cdn.pixabay.com/photo/2020/07/21/16/24/landscape-5426755__340.jpg"
                      className="card-img-top"
                      alt="deer"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Name :{item?.product?.productName}
                      </h5>
                      <p className="card-text">
                        Description :{item?.product?.description}
                      </p>
                      <p className="card-text">Price :{item?.product?.price}</p>
                    </div>
                  </div>
                );
              })
            : "No data"}
        </div>
      </div>
    </>
  );
};

export default Order;
