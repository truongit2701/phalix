import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { image, name, default_price, id } = props.product;

  const navigateToProductDetail = () => {
    // Chuyển hướng tới trang chi tiết sản phẩm khi nhấp vào sản phẩm
    // Sử dụng ID của sản phẩm trong đường dẫn
    props.history.push(`/product/${id}`);
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="product-item">
        <div className="product-item-img">
          <img src={image} />
        </div>
        <div className="product-item-info">
          <h5>{name}</h5>
          <p>{default_price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
