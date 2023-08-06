import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function UpdateMaterial({
  materialData,
  toggleUpdatePopup,
  showUpdatePopup,
  saveUpdateMaterial,
}) {
  const [materialUpdateName, setMaterialUpdateName] = useState(
    materialData.name
  );
  const [materialUpdateDescription, setMaterialUpdateDescription] = useState(
    materialData.description
  );

  const [show, setShow] = useState(showUpdatePopup);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={showUpdatePopup} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMaterialUpdateName("");
              setMaterialUpdateDescription("");
              saveUpdateMaterial({
                materialUpdateName,
                materialUpdateDescription,
                id: materialData.id,
              });
            }}
            id="updatemodal"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="material name"
                value={materialUpdateName}
                onChange={(e) => setMaterialUpdateName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={materialUpdateDescription}
                onChange={(e) => setMaterialUpdateDescription(e.target.value)}
                rows={3}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn bg-gray" onClick={toggleUpdatePopup}>
            Close
          </button>
          <button className="btn bg-blue" form="updatemodal">
            Complete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateMaterial;
