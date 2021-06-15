import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { useRouter } from "next/router";

const FilterProvider = (props) => {
  const router = useRouter();
  const vendor = router.query.vendor;
  const productType = router.query.productType;
  const tags = router.query.tags;
  const min = router.query.min;
  const max = router.query.max;
  let vendorParam = vendor ? vendor.split(",") : null;
  let categoryParams = productType ? productType.split(",") : [];
  let tagsParam = tags ? tags.split(",") : null;
  const [selectedVendor, setSelectedVendor] = useState(vendorParam ? vendorParam : []);
  const [selectedCategory, setSelectedCategory] = useState(categoryParams ? categoryParams : []);
  const [selectedTags, setSelectedTags] = useState(tagsParam ? tagsParam : []);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : 6000,
  });
  const [isVendorChecked, setIsVendorChecked] = useState(true);
  const [isCategoryChecked, setIsCategoryChecked] = useState(true);
  const [isTagChecked, setIsTagChecked] = useState(true);
  
  const [filterChecked, setFilterChecked] = useState([{}]);

/*   const handleAvailability = (availability, checked) => {
    var index = selectedAvailability.indexOf(availability);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ availability: availability, checked }]);
      setSelectedAvailability(selectedAvailability.filter((e) => e !== availability));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ availability: availability, checked }]);
      setSelectedAvailability([...selectedAvailability, availability]);
    }
  }; */


  const handleVendor = (vendor, checked) => {
    var index = selectedVendor.indexOf(vendor);
    if (index > -1) {
      setIsVendorChecked(!isVendorChecked);
      setFilterChecked([{ vendor: vendor, checked }]);
      setSelectedVendor(selectedVendor.filter((e) => e !== vendor));
    } else {
      setIsVendorChecked(!isVendorChecked);
      setFilterChecked([{ vendor: vendor, checked }]);
      setSelectedVendor([...selectedVendor, vendor]);
    }
  };

  const handleCategory = (category, checked) => {
    var index = selectedCategory.indexOf(category);
    if (index > -1) {
      setIsCategoryChecked(!isCategoryChecked);
      setFilterChecked([{ category: category, checked }]);
      setSelectedCategory(selectedCategory.filter((e) => e !== category));
    } else {
      setIsCategoryChecked(!isCategoryChecked);
      setFilterChecked([{ category: category, checked }]);
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleTags = (tags, checked) => {
    var index = selectedTags.indexOf(tags);
    if (index > -1) {
      setIsTagChecked(!isTagChecked);
      setFilterChecked([{ tags: tags, checked }]);
      setSelectedTags(selectedTags.filter((e) => e !== tags));
    } else {
      setIsTagChecked(!isTagChecked);
      setFilterChecked([{ tags: tags, checked }]);
      setSelectedTags([...selectedTags, tags]);
    }
  };

 /*  const handleSizes = (size, checked) => {
    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize(selectedSize.filter((e) => e !== size));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize([...selectedSize, size]);
    }
  };


  const handleDiscount = (discount, checked) => {
    var index = selectedDiscount.indexOf(discount);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ discount: discount, checked }]);
      setSelectedDiscount(selectedDiscount.filter((e) => e !== discount));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ discount: discount, checked }]);
      setSelectedDiscount([...selectedDiscount, discount]);
    }
  }; */


  return (
    <FilterContext.Provider
      value={{
        ...props,
        selectedVendor,
        setSelectedVendor,
        selectedCategory,
        setSelectedCategory,
        selectedTags,
        setSelectedTags,
        selectedPrice,
        setSelectedPrice,
        isVendorChecked,
        isCategoryChecked,
        isTagChecked,
        filterChecked,
        handleCategory: handleCategory,
        handleVendor: handleVendor,
        handleTags: handleTags,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
