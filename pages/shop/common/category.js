import React, { useState, useContext, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { getCategories as getCategoryApi } from '../../../config/api/products';


const Category = () => {
  const context = useContext(FilterContext);
  const isChecked = context.isCategoryChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [stock, setStock] = useState([{name: 'In Stock', qty: 50 }]);
  const [categoryApi, setCategoryApi] = useState([]);
  const [isOpen, setIsOpen] = useState(context.selectedCategory.length > 0 ? true : false);


  useEffect(() => {
    const getProducts = async () => {
        try {
            let { data } = await getCategoryApi();
            setCategoryApi(data);
        } catch (error) {
            console.error(error);
        }
    }
    getProducts();

}, [])


  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Product type
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!categoryApi || categoryApi.length === 0
              ? "loading"
              : categoryApi &&
              categoryApi.map((category, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedCategory.includes(`${category.id}`)}
                      onChange={() => {
                        context.handleCategory(`${category.id}`, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={category.name}
                    />

                    <label className="custom-control-label" htmlFor={category.name}>
                      {category.name.toUpperCase()}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Category;
