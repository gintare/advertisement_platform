import { useState } from "react";
import "./CategoriesForm.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postCategory } from "../../../services/post";

function CategoriesForm({setUpdate}) {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: '',
        },
      });

  const formSubmitHandler = async (data) => {
    try{
      const cat = await postCategory(data);
      if(!cat){
        throw new Error("No category posted");
      }
      reset();
      setUpdate(prev => prev + 1);
    }catch(error) {
       toast.error(error.message);
       console.error(error.message);
    }

  }    

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="row g-3 needs-validation" noValidate>
        <div className="col-12">
          <label htmlFor="title" className="form-label">
            First name
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            {...register('title', {
                required: 'Category name is required',
                validate: (value) => value.trim() !== '' || 'Category name cannot be empty',
              })}
          />
          <div className="valid-feedback">Looks good!</div>
          {errors.title && <div className='invalid-feedback'>{errors.title.message}</div>}
        </div>
        
        
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CategoriesForm;
