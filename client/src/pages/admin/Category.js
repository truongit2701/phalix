import React, { useEffect, useState } from "react";
import AddCategory from "../../component/admin/AddCategory";

function Category() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [categoryList, setCategoryList] = useState([]);

  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  // lấy sản phẩm
  useEffect(() => {
    fetchCategorys();
  }, []);

  const fetchCategorys = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/category/list`);
      const data = await response.json();
      setCategoryList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function createCategory(categoryName, categoryDescription) {
    const data = { name: categoryName, description: categoryDescription };
    await fetch(`${apiUrl}/api/category/create`, {
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
        const newCategory = {
          id: data.data.id,
          description: data.data.description,
          name: data.data.name,
        };
        setCategoryList([...categoryList, newCategory]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function removeCategory(id) {
    await fetch(`${apiUrl}/api/category/${id}/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setCategoryList(categoryList.filter((m) => m.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="admin-container">
      <AddCategory
        createCategory={createCategory}
        toggleShow={toggleShow}
        // removeCategory={removeCategory}
        show={show}
      />

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
          {categoryList.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <div className="btn-table">
                    <button
                      className="btn bg-red"
                      onClick={() => removeCategory(p.id)}
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

export default Category;
