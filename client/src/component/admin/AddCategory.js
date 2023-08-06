import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddCategory(props) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  return (
    <div>
      <button
        variant="warning"
        className="btn bg-yellow"
        onClick={props.toggleShow}
      >
        + Add Category
      </button>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCategoryName("");
              setCategoryDescription("");
              props.createCategory(categoryName, categoryDescription);
            }}
            id="editmodal"
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
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

export default AddCategory;
