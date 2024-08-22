import { Controller, useForm } from "react-hook-form";
import "./AdversementForm.css";
import { useEffect, useState } from "react";
import { getCategries } from "../../../services/get";
import { toast } from "react-toastify";
import { postAdvertisement } from "../../../services/post";

function AdversementForm() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      city: "",
      price: 0,
      categoryId: 0,
      category: {},
    },
  });

  const handleChange = (event) => {
    setCategory(event.target.value);
    // console.log(event.target.value);
    // setValue("categoryId", event.target.value);
  };

  const formSubmitHandler = async (data) => {
    try {
      if (data.categoryId == 0) {
        data.categoryId = categories[0].id;
      }

      const adv = await postAdvertisement(data.categoryId, data);
      if (!adv) {
        throw new Error("No advertisement saved");
      }
      toast.success("Advertisement saved successifully");
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const categor = await getCategries();
      if (categor.lenght == 0) {
        throw new Error("no categories found");
      }
      setCategories(categor);
    };
    getData();
  }, []);

  return (
    <>
      <form
        className="row g-3 needs-validation register-form mt-2 d-flex flex-column align-items-stretch"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            maxLength={40}
            {...register("title", {
              required: "Advertisement title is required",
              maxLength: {
                value: 40,
                message: "Advertisement title cannot exceed 40 characters",
              },
              validate: (value) =>
                value.trim() !== "" ||
                "Advertisement title name cannot be empty",
              maxLength: (value) =>
                value.length <= 40 ||
                "Advertisement title cannot exceed 40 characters",
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            placeholder="Advertisement description here"
            {...register("description", {
              required: "Advertisement description is required",
              validate: (value) =>
                value.trim() !== "" ||
                "Advertisement description cannot be empty",
            })}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                // labelId="category"
                className="form-select form-select-md mb-3"
                id="category"
                value={value}
                label="Category"
                onChange={onChange}
                // {...register("categoryId")}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="price" className="form-label">
            Price, EUR
          </label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            {...register("price", {
              required: "Price is required",
              validate: {
                notEmpty: (value) =>
                  value.toString().trim() !== "" || "Price cannot be empty",
                notZero: (value) =>
                  value.toString().trim() !== "0" || "Price cannot be 0",
                maxLength: (value) =>
                  value.toString().length <= 5 ||
                  "Price cannot be longer than 5 characters",
              },
            })}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            id="city"
            maxLength={40}
            {...register("city", {
              required: "Advertisement city is required",
              maxLength: {
                value: 40,
                message: "Advertisement city cannot exceed 40 characters",
              },
              validate: (value) =>
                value.trim() !== "" ||
                "Advertisement city name cannot be empty",
              maxLength: (value) =>
                value.length <= 40 ||
                "Advertisement city cannot exceed 40 characters",
            })}
          />
          {errors.city && (
            <div className="invalid-feedback">{errors.city.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <button type="submit" className="btn submit-btn w-100">
            Add Advertisement
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </form>
    </>
  );
}

export default AdversementForm;
