import React, { useState, useEffect } from "react";
import AddMaterial from "../../component/admin/AddMaterial";
import UpdateMaterial from "../../component/admin/UpdateMaterial";

function Material() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [materialList, setMaterialList] = useState([]);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updateMaterialData, setUpdateMaterialData] = useState(null);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  function toggleUpdatePopup() {
    setShowUpdatePopup(!showUpdatePopup);
  }

  // lấy sản phẩm
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/material/list`);
      const data = await response.json();
      setMaterialList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function createMaterial(materialName, materialDescription) {
    const data = { name: materialName, description: materialDescription };
    await fetch(`${apiUrl}/api/material/create`, {
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
        const newMaterial = {
          id: data.data.id,
          description: data.data.description,
          name: data.data.name,
        };
        setMaterialList([...materialList, newMaterial]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateMaterial(id) {
    try {
      const response = await fetch(`${apiUrl}/api/material/${id}/detail`);
      const data = await response.json();
      setUpdateMaterialData(data.data);
      toggleUpdatePopup();
    } catch (err) {
      console.log(err);
    }
  }

  async function saveUpdateMaterial(data) {
    await fetch(`${apiUrl}/api/material/${data.id}/update`, {
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
        toggleUpdatePopup();
        const newMaterial = {
          id: data.data.id,
          description: data.data.description,
          name: data.data.name,
        };
        setMaterialList([...materialList, newMaterial]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function removeMaterial(id) {
    await fetch(`${apiUrl}/api/material/${id}/remove`, {
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
        setMaterialList(materialList.filter((m) => m.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="admin-container">
      <AddMaterial
        createMaterial={createMaterial}
        toggleShow={toggleShow}
        show={show}
      />

      {showUpdatePopup && (
        <UpdateMaterial
          materialData={updateMaterialData}
          toggleUpdatePopup={toggleUpdatePopup}
          showUpdatePopup={showUpdatePopup}
          saveUpdateMaterial={saveUpdateMaterial}
        />
      )}

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
          {materialList.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <div className="btn-table">
                    <button
                      className="btn bg-blue"
                      onClick={() => updateMaterial(p.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-red"
                      onClick={() => removeMaterial(p.id)}
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

export default Material;
