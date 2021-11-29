import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function AddProductModal(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    picture: "",
  });
  //handle chgange
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadSingleFile = (e) => {
    if (e.target.files[0]) {
      // console.log("e.target.files[0]: ", e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        // console.log("reader.result: ", reader.result);
        setProduct({ ...product, ["picture"]: reader.result });
        // setFile(reader.result);
      };
    }
  };

  return (
    <div>
      <button type="button" class="btn btn-success" onClick={openModal}>
        Add products
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Product name
            </label>
            <input
              name="productName"
              onChange={handleProductChange}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Product name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Description
            </label>
            <input
              name="description"
              onChange={handleProductChange}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Price
            </label>
            <input
              name="price"
              onChange={handleProductChange}
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Price"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Choose image
            </label>
            <input
              // disabled={loader}
              type="file"
              // disabled={file || loader}
              className="form-control"
              onChange={uploadSingleFile}
            />
          </div>

          <div>
            <div>
              <button
                type="button"
                onClick={() => {
                  props.addProductApi(product, closeModal);
                }}
                className="btn btn-success m-1"
              >
                Add
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-danger m-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddProductModal;
