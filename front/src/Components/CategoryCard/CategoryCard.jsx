import { useEffect, useState } from "react";
import "./CategoryCard.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCategory } from "../../services/delete";
import { toast } from "react-toastify";

function CategoryCard({ category, setUpdate }) {
  const [editCard, setEditCard] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const formSubmitHandler = async (data) => {
    setUpdate((prev) => prev + 1);
  };

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      setShow(false);
      await deleteCategory(category.id);
      toast.success("Category deleted successfully");
      setUpdate((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting category:", error.message);
      toast.error("Error deleting category");
    }
  };

  useEffect(() => {
    if (editCard) {
      setValue("title", category.title, { shouldValidate: true });
    }
  }, [editCard]);

  return (
    <>
      <div className="category-row row">
        {!editCard && (
          <>
            <div className="col">{category.title}</div>
            <div className="col-auto">
              <i
                className="bi bi-pen"
                onClick={() => {
                  setEditCard(true);
                }}
              ></i>
              <i
                className="bi bi-trash"
                onClick={() => {
                  setShow(true);
                }}
              ></i>
            </div>
          </>
        )}
        {editCard && (
          <>
            <form
              onSubmit={handleSubmit(formSubmitHandler)}
              className="row g-3 needs-validation"
              noValidate
            >
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  {...register("title", {
                    required: "Category name is required",
                    validate: (value) =>
                      value.trim() !== "" || "Category name cannot be empty",
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <i
                  className="bi bi-x-circle"
                  onClick={() => {
                    setEditCard(false);
                  }}
                ></i>
              </div>
            </form>
          </>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header"></Modal.Header>
        <Modal.Body>
          Do you really want to delete category <b>{category.title}</b>?
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{
              backgroundColor: "var(--tomato)",
              color: "white",
              border: "none",
            }}
            onClick={handleDelete}
          >
            Delete Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryCard;
