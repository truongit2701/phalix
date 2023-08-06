import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

function AddProduct(props) {
  const {
    productName,
    productPrice,
    productColor,
    productSize,
    productMaterial,
    productCategory,
    setProductName,
    setProductPrice,
    setProductColor,
    setProductSize,
    setProductMaterial,
    setProductCategory,
  } = props.dataProduct;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [materialOptions, setMaterialOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState();
  const [sizeOptions, setSizeOptions] = useState();

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setMaterialOptions(await fetchMaterial());
    setCategoryOptions(await fetchCategory());
    setSizeOptions(await fetchSize());
  }

  const handleSizeChange = (selectedOptions) => {
    setProductSize(selectedOptions);
  };

  const handleMaterialChange = (selectedOptions) => {
    setProductMaterial(selectedOptions);
  };
  const handleCategoryChange = (selectedOptions) => {
    setProductCategory(selectedOptions.value);
  };

  async function fetchMaterial() {
    try {
      const response = await fetch(`${apiUrl}/api/material/list`);
      const data = await response.json();
      return data.data.map((m) => {
        return {
          value: m.id,
          label: m.name,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchSize() {
    try {
      const response = await fetch(`${apiUrl}/api/size/list`);
      const data = await response.json();
      return data.data.map((m) => {
        return {
          value: m.id,
          label: m.name,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCategory() {
    try {
      const response = await fetch(`${apiUrl}/api/category/list`);
      const data = await response.json();
      return data.data.map((m) => {
        return {
          value: m.id,
          label: m.name,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="admin-container">
      <button
        variant="warning"
        className="btn bg-yellow"
        onClick={props.toggleShow}
      >
        + Add Product
      </button>

      <Modal show={props.show} onHide={handleClose} onShow={handleShow}>
        <Modal.Header>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.createProduct({
                productName,
                productPrice,
                productSize,
                productColor,
                productMaterial,
                productCategory,
              });
            }}
            id="editmodal"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Material</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={materialOptions}
                value={productMaterial}
                onChange={handleMaterialChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <Select
                onChange={handleCategoryChange}
                closeMenuOnSelect={false}
                options={categoryOptions}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                value={productColor}
                onChange={(e) => setProductColor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Size</label>
              <Select
                onChange={handleSizeChange}
                isMulti
                closeMenuOnSelect={false}
                options={sizeOptions}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn bg-gray" onClick={props.toggleShow}>
            Close
          </button>
          <button className="btn bg-blue" form="editmodal">
            Complete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProduct;
