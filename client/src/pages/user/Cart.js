import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";

function Cart() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  function calculateTotalPrice() {
    let total = 0;
    for (const item of cart) {
      if (item.status == 0) {
        total += Number(item.product.default_price);
      }
    }
    setTotalPrice(total);
  }

  async function fetchCart() {
    try {
      const response = await fetch(`${apiUrl}/api/cart/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCart(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function checkout() {
    const token = cookies.get("token");

    await fetch(`${apiUrl}/api/cart/change-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idCarts: cart.map((item) => {
          if (item.status === 0) {
            return item.id;
          }
        }),
      }),
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

  async function checkoutOne(id) {
    const token = cookies.get("token");

    await fetch(`${apiUrl}/api/cart/change-status-private`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        setCart([...cart.filter((c) => c.id != id), data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
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
          {cart.map((c) => {
            let text = "";
            switch (c.status) {
              case 0:
                text = "Chưa đặt";
                break;
              case 1:
                text = "Đợi Shop đóng gói";
                break;
              case 2:
                text =
                  "Đơn hàng được giao dự kiến vào " +
                  moment(c.updated).add(3, "days").format("DD/MM/YYYY");
                break;
            }
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                  <img className="product-admin-img" src={c.product.image} />
                </td>
                <td>{c.product.default_price}</td>
                <td>{text}</td>
                <td>
                  {c.status === 0 ? (
                    <button className="btn" onClick={() => checkoutOne(c.id)}>
                      Đặt hàng
                    </button>
                  ) : (
                    <button className="btn">Đã đặt</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>Tổng tiền: ${totalPrice}</div>
      <button className="btn" onClick={checkout}>
        Đặt hàng
      </button>
    </div>
  );
}

export default Cart;
