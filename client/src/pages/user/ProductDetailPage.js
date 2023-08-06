import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailPage.css";
import Cookies from "universal-cookie";
import { UserContext } from "../../context/userContext";

function ProductDetailPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const cookies = new Cookies();
  useEffect(() => {
    fetchDetail();
  }, [id]);

  async function fetchDetail() {
    try {
      const response = await fetch(`${apiUrl}/api/product/${id}/detail`);
      const data = await response.json();
      setProduct(data.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function addCart() {
    const token = cookies.get("token");
    await fetch(`${apiUrl}/api/cart/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: product.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="mt-3 heading">
        Trang chủ / Sản phẩm bán chạy / {product.name}
      </p>
      <div className="product-detail">
        <div className="product-detail-carousel">
          <img src={product?.image} />
        </div>
        <div className="product-detail-info">
          <h4>{product?.name}</h4>
          <p>{product?.default_price}</p>
          <div className="product-detail-material">
            <div className="product-material-box">
              <h5>Chất liệu</h5>
              <div className="product-material-btns">
                {product?.materials.map((item) => {
                  return (
                    <>
                      <button className="btn">{item.name}</button>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="product-size-box">
            <h5>Kích thước</h5>
            <div className="product-size-btns">
              {product?.sizes.map((item) => {
                return (
                  <>
                    <button className="btn">{item.name}</button>
                  </>
                );
              })}
            </div>
          </div>
          <div className="product-btn">
            <button className="btn w-100" onClick={addCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
