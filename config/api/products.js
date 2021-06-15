import axios from 'axios';


export const getProducts = (tag, vendors, category, min, max) =>
  axios.get('/products', {
    params: {
      tags: tag,
      vendorId: vendors,
      productTypeId: category,
      lowerPrice: min,
      upperPrice: max

    }
  });

export const getProductDetail = (id) =>
  axios.get(`/products/${id}`);

export const getRelated = (id) =>
  axios.get(`/products/related/${id}`);

export const getPopular = () =>
  axios.get(`/products/top`);

export const getNewArrival = () =>
  axios.get(`/products/arrival`);

export const getFeatured = () =>
  axios.get(`/products/featured`);

export const getSpecial = () =>
  axios.get(`/products/special`);

export const getProductVariants = (id) =>
  axios.get(`/products/${id}/variants`);

export const getCategories = () =>
  axios.get(`/product/types`);

export const getTags = () =>
  axios.get(`/product/tags`);

export const getVendor = () =>
  axios.get(`/vendors`);

export const getCustom = () =>
  axios.get(`/customs`);

export const getFavorites = () =>
  axios.get(`/favorites`);

export const addFavorites = (id) =>
  axios.post(`/favorites/${id}`,{});

export const delFavorites = (id) =>
  axios.delete(`/favorites/${id}`);