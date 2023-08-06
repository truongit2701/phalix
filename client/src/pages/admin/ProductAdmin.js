import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import "./AdminIndex.css";
import "./Table.css";
import AddProduct from "../../component/admin/AddProduct";

function ProductPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState([]);
  const [productMaterial, setProductMaterial] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const dataProduct = {
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
  };

  function toggleShow() {
    setShow(!show);
  }
  // lấy sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/product/list`);
      const data = await response.json();
      setProductList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createProduct = async () => {
    await fetch(`${apiUrl}/api/product/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        color: productColor,
        sizes: productSize.map((pS) => pS.value),
        materials: productMaterial.map((pM) => pM.value),
        category: productCategory,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data product khi create", data);
        toggleShow(!show);

        setProductList([...productList, data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <AddProduct
        createProduct={createProduct}
        toggleShow={toggleShow}
        show={show}
        dataProduct={dataProduct}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Material</th>
            <th>Color</th>
            <th>Category</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img className="product-admin-img" src={p.image} />
                </td>
                <td>{p.name}</td>
                <td>{p.default_price}</td>
                <td>{p.materialNames.toString()}</td>
                <td>{p.color}</td>
                <td>{p.category.name}</td>
                <td>{p.sizeNames.toString()}</td>
                <td>
                  <div className="btn-table">
                    <button className="btn bg-success">Edit</button>
                    <button className="btn bg-danger">Remove</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;
