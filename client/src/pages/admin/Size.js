import React, { useEffect, useState } from "react";
import AddSize from "../../component/admin/AddSize";

function Size() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sizeList, setSizeList] = useState([]);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  // lấy sản phẩm
  useEffect(() => {
    fetchSize();
  }, []);

  const fetchSize = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/size/list`);
      const data = await response.json();
      setSizeList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function createSize(sizeName, sizeDescription) {
    const data = { name: sizeName, description: sizeDescription };
    await fetch(`${apiUrl}/api/size/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        const newSize = {
          id: data.data.id,
          description: data.data.description,
          name: data.data.name,
        };
        setSizeList([...sizeList, newSize]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const removeSize = () => {};
  return (
    <div className="admin-container">
      <AddSize createSize={createSize} toggleShow={toggleShow} show={show} />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sizeList.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <div className="btn-table">
                    <button
                      className="btn bg-red"
                      onClick={() => removeSize(p.id)}
                    >
                      Remove
                    </button>
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

export default Size;
