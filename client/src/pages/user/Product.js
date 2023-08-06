import React, { useState, useEffect } from "react";
import "./Product.css";
import ProductCard from "../../component/user/ProductCard";

function Product() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [product, setProduct] = useState([]);
  // lấy sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(`${apiUrl}/api/product/list`);
      const data = await response.json();
      setProduct(data.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <div>
      <div className="product-list">
        {product.map((p) => {
          return <ProductCard key={p.id} product={p} />;
        })}
      </div>
    </div>
  );
}

export default Product;
