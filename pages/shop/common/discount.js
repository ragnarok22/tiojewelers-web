import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";


const Discount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [discountApi, setDiscount] = useState([
    {discount:'30%', qty:'1'},
    {discount:'No discount', qty:'12'},
  ]);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        discount
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!discountApi || discountApi.length === 0
              ? "loading"
              : discountApi &&
              discountApi.map(({discount, qty}, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedDiscount.includes(discount)}
                      onChange={() => {
                        context.handleDiscount(discount, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={discount}
                    />

                    <label className="custom-control-label" htmlFor={discount}>
                      {discount} {`(${qty})`}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Discount;
