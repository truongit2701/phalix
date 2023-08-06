import React, { useState, useEffect } from "react";

function Order() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [orderList, setOrderList] = useState([]);

  // lấy sản phẩm
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/admin-list`);
      const data = await response.json();
      setOrderList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function acceptOrder(id) {
    await fetch(`${apiUrl}/api/cart/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(orderList);
        setOrderList([...orderList.filter((i) => i.id !== id), data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="admin-container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Price</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((c) => {
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                  <img className="product-admin-img" src={c.product.image} />
                </td>
                <td>{c.product.default_price}</td>
                <td>{c.status === 1 ? "Chưa duyệt" : "Đang giao"}</td>
                <td>
                  {c.status === 1 ? (
                    <button className="btn" onClick={() => acceptOrder(c.id)}>
                      Duyệt
                    </button>
                  ) : (
                    "Đã duyệt"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
