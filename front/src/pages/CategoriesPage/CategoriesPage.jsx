import { useEffect, useState } from "react";
import CategoriesForm from "../../Components/Forms/CategoriesForm/CategoriesForm";
import "./CategoriesPage.css";
import { getCategries } from "../../services/get";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(0);
  
  useEffect(() => {
    const getData = async () => {
        try{
            const cat = await getCategries();
            console.log(cat);
            if(!cat){
              throw new Error("No category posted");
            }
            setCategories(cat);
          }catch(error) {
             toast.error(error.message);
             console.error(error.message);
          }
    }
    getData();
  }, [update]);

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <h1>Categies page</h1>
          <div className="col-12 col-md-6">
            <CategoriesForm setUpdate={setUpdate}/>
          </div>
          <div className="col-12 col-md-6 container">
            {categories.map((category, index) => {
            return <CategoryCard key={index} category={category} setUpdate={setUpdate} />;
          })}</div>
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
