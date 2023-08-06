import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddMaterial(props) {
  const [materialName, setMaterialName] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        variant="warning"
        className="btn bg-yellow"
        onClick={props.toggleShow}
      >
        + Add Material
      </button>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMaterialName("");
              setMaterialDescription("");
              props.createMaterial(materialName, materialDescription);
            }}
            id="editmodal"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="material name"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={materialDescription}
                onChange={(e) => setMaterialDescription(e.target.value)}
                rows={3}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn bg-gray" onClick={props.toggleShow}>
            Close
          </button>
          <button className="btn bg-blue" form="editmodal">
            Complete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMaterial;
