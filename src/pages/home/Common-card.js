import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CommonCard = ({ productsHomeData1 }) => {
  const history = useHistory();
  const [checkLogin, setCheckLogin] = useState(null);

  useEffect(() => {
    setCheckLogin(JSON.parse(localStorage.getItem("token")));
  }, []);

  const addToWishlist = async (_id) => {
    if (!checkLogin) return history.push("/login");
    //api call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/add/wishlist",
        {
          productId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${checkLogin}`,
          },
        }
      );
      console.log("wishresponse: ", response);
    } catch (error) {
      console.log("error: ", error);
      // alert(error.response.data.error);
    }
  };

  const placeOrder = async (_id) => {
    if (!checkLogin) return history.push("/login");

    //api call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/place/order",
        {
          productId: _id,
          todaysDate: Date.now(),
          transactionId: uuidv4(),
          address: null,
          user: JSON.parse(localStorage.getItem("userDetails"))._id,
        },
        {
          headers: {
            Authorization: `Bearer ${checkLogin}`,
          },
        }
      );
      console.log("oderresponse: ", response);
    } catch (error) {
      console.log("error: ", error);
      // alert(error.response.data.error);
    }
  };

  return (
    productsHomeData1 && (
      <div className="card m-1" style={{ width: "18rem" }}>
        <img
          src={
            productsHomeData1?.picture
              ? productsHomeData1?.picture
              : "https://cdn.pixabay.com/photo/2020/07/21/16/24/landscape-5426755__340.jpg"
          }
          className="card-img-top"
          alt="deer"
        />
        <div className="card-body">
          <h5 className="card-title">Name : {productsHomeData1.productName}</h5>
          <p className="card-text">
            Description : {productsHomeData1.description}
          </p>
          <p className="card-text">Price : {productsHomeData1.price}</p>

          <button
            className="btn btn-primary m-1"
            onClick={() => {
              addToWishlist(productsHomeData1._id);
            }}
          >
            Add to wishlist
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={() => {
              placeOrder(productsHomeData1._id);
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    )
  );
};

export default CommonCard;
