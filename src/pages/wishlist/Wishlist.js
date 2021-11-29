import React, { useState, useEffect } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    getWishlistApi();
  }, []);

  //get
  const getWishlistApi = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token: ", token);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/my/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);
      setWishlistData(response.data.data);
    } catch (error) {
      console.log("error: ", error);
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="text-center">Wishlist</h1>
        </div>
        <div className="row d-flex p-2 ">
          {wishlistData && wishlistData.length !== 0
            ? wishlistData.map((item) => {
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

export default Wishlist;
