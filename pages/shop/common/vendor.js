import React, { useState, useContext, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { getVendor as getVendorApi } from '../../../config/api/products';


const Vendor = () => {
  const context = useContext(FilterContext);
  const isChecked = context.isVendorChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [stock, setStock] = useState([{name: 'In Stock', qty: 50 }]);
  const [vendorApi, setVendorApi] = useState([]);
  const [isOpen, setIsOpen] = useState(context.selectedVendor.length > 0 ? true : false);


  useEffect(() => {
    const getProducts = async () => {
        try {
            let { data } = await getVendorApi();
            setVendorApi(data);
        } catch (error) {
            console.error(error);
        }
    }
    getProducts();

}, [])

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Vendor
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!vendorApi || vendorApi.length === 0
              ? "loading"
              : vendorApi &&
              vendorApi.map((vendor, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedVendor.includes(`${vendor.id}`)}
                      onChange={() => {
                        context.handleVendor(`${vendor.id}`, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={vendor.name}
                    />

                    <label className="custom-control-label" htmlFor={vendor.name}>
                      {vendor.name.toUpperCase()}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Vendor;
