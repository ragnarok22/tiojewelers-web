import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";


const Size = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [sizeApi, setSizeApi] = useState(['8', '8mm', '9.5', '10', '11']);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        size
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!sizeApi || sizeApi.length === 0
              ? "loading"
              : sizeApi &&
              sizeApi.map((size, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedSize.includes(size)}
                      onChange={() => {
                        context.handleSizes(size, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={size}
                    />

                    <label className="custom-control-label" htmlFor={size}>
                      {size}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Size;
