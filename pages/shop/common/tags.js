import React, { useState, useContext, useEffect } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { getTags as getTagsApi } from '../../../config/api/products';


const Tags = () => {
  const context = useContext(FilterContext);
  const isChecked = context.isTagChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);
  const [tagsApi, setTagsApi] = useState([]);
  const [isOpen, setIsOpen] = useState(context.selectedTags.length > 0 ? true : false);


  useEffect(() => {
    const getTags = async () => {
        try {
            let { data } = await getTagsApi();
            setTagsApi(data);
        } catch (error) {
            console.error(error);
        }
    }
    getTags();

}, [])

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Tags
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {!tagsApi || tagsApi.length === 0
              ? "loading"
              : tagsApi &&
              tagsApi.map((tags, index) => (
                  <div key={index}
                    className="custom-control custom-checkbox collection-filter-checkbox"
                  >
                    <Input
                      checked={context.selectedTags.includes(`${tags.id}`)}
                      onChange={() => {
                        context.handleTags(`${tags.id}`, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={tags.name}
                    />

                    <label className="custom-control-label" htmlFor={tags.name}>
                      {tags.name.toUpperCase()}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Tags;
