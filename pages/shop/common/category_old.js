import React, { useState, useContext, useEffect } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { getCategories as getCategoriesApi } from '../../../config/api/products';


const Category = () => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
        try {
            let { data } = await getCategoriesApi();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }
    getProducts();

}, [])

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Product Type
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {
                  categories && categories.map((category, index) => (
                    <li key={index}>
                      <a href={null} onClick={() => updateCategory(`${category}`)}>
                        {category.name}
                      </a>
                    </li>

                  ))
                }
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;