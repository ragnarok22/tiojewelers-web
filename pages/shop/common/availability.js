import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const Availability = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [stock, setStock] = useState([{name: 'In Stock', qty: 50 }]);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Availability
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!stock || stock.length === 0 
              ? "loading"
              : stock &&
              stock.map((availability, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedAvailability.includes(availability)}
                      onChange={() => {
                        context.handleAvailability(availability, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={availability.name}
                    />

                    <label className="custom-control-label" htmlFor={availability.name}>
                      {availability.name} {`(${availability.qty})`}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Availability;
