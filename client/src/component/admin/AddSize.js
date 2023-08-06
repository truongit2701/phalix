import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddSize(props) {
  const [sizeName, setSizeName] = useState("");
  const [sizeDescription, setSizeDescription] = useState("");

  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  return (
    <div>
      <button
        variant="warning"
        className="btn bg-yellow"
        onClick={props.toggleShow}
      >
        + Add Size
      </button>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSizeName("");
              setSizeDescription("");
              props.createSize(sizeName, sizeDescription);
            }}
            id="editmodal"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={sizeDescription}
                onChange={(e) => setSizeDescription(e.target.value)}
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
    </div>
  );
}

export default AddSize;
