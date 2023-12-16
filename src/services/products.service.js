// products.service.js
import Api from "src/core/api";
import axios from "axios";
import { conf } from "src/core/conf";

const getAllProducts = async () => {
  const response = await Api.get("/product/getall");
  return response;
};

const orderByEnum = {
  "default": 0,
  "popular": 1,
  "new": 2,
  "price-asc": 3,
  "price-desc": 4
}

const getFilteredProducts = async (page, length, filters) => {
  const queryParams = {
    orderBy: orderByEnum[filters.sortBy || "default"],
    categoryIds: filters.categories?.filter(f => f !== "all"),
    allergensIdsNotContain: filters.alergens,
    ShowOnHomePage: filters.ShowOnHomePage,
    special: filters.special, // special will be used for box products
    pageNumber: (page ? page : 1),
    pageSize: (length ? length : 18)
  }

  // todo someone should fix api service. I ain't doing that
  // const response = await Api.get("/product/GetFiltered", { params: queryParams });
  const response = await axios.get(`${conf.server}/product/GetFiltered`, { params: queryParams, paramsSerializer: { indexes: null } });

  return { data: response.data.data, length: response.data.totalCount };
};

const getProducts = async (page, count, filters) => {
  const getRandomStr = () => {
    return (Math.random() + 1).toString(36).substring(3);
  };

  const generateRandomProduct = (id) => {
    const prices = ["$10.99", "$15.99", "$20.99", "$25.99", "$30.99"];

    const randomIndex = Math.floor(Math.random() * prices.length);

    return {
      id: `product_${id}`,
      name: id + " " + getRandomStr(),
      img: "https://cataas.com/cat",
      price: prices[randomIndex],
    };
  };

  const products = [];
  const startingIndex = (page - 1) * count + 1;
  const maxItems = 3;

  for (let i = startingIndex; i < startingIndex + count; i++) {
    if (i > maxItems) {
      break;
    }

    products.push(generateRandomProduct(i));
  }

  // todo change that with api request and some sequriry mesurements
  return { data: products, length: maxItems };
};

const getProductsCount = async (filters) => {
  //same request above but count
  return 100;
};

const getProductById = async (id) => {
  const response = await Api.get(`/Product/GetById?id=${id}`);
  return response;
};


const deleteProduct = async (id) => {
  const response = await Api.delete(`/product/delete/${id}`);
  return response;
};

const upsertProduct = async (product) => {
  const url = "/product/UpsertWithPhotos";
  const formData = new FormData();

  if (product.files) {
    product.files.forEach((fileObj) => {
      formData.append("files", fileObj.file);
    });
    delete product.files;
  }

  Object.keys(product).forEach((key) => {
    if (key === 'showOnHomepage' && product[key] === null) {
        formData.append(key, false);
    } else if (key === 'showOnHomepage') {
        formData.append(key, product[key]);
    } else if (Array.isArray(product[key])) {
        product[key].forEach((value) => {
            formData.append(`${key}[]`, value);
        });
    } else {
        formData.append(key, product[key]);
    }
  });

  formData.append('caloriesPer100Grams', product.calories)
  formData.append('categories', [product.categoryId]); // Currently server receives list of cateogires which should be changed to single category 
  try {
    return await Api.postFormData(url, formData);
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
};

const getProductsNames = async () => {
  const response = await Api.get("/product/getProductNames");
  return response;
};

const getShortView = async (categoryIds = [], allergensIdsNotContain = []) => {
  const response = await Api.get("/product/getshortview", {
    params: {
      categoryIds: categoryIds,
      allergensIdsNotContain: allergensIdsNotContain,
    },
  });
  return response;
};

const getSimilarProducts = async (productId, count) => {
  try {
    const response = await Api.get(`/SimilarProducts/GetSimilarProducts?productId=${productId}&count=${count}`);
    return response;
  } catch (error) {
    // Handle errors or exceptions here
    console.error('Error in getSimilarProducts:', error);
    throw error;
  }
};
const getProductReviewStatistics = async (productId) => {
  try {
    const response = await Api.get(`/Statistics/GetProductReviewStatistics?ProductId=${productId}`);
    return response;
  } catch (error) {
    // Handle errors or exceptions here
    console.error('Error in getProductReviewStatistics:', error);
    throw error;
  }
};
const getRatingById = async (ratingId) => {
  try {
    const response = await Api.get(`/Rating/GetById?id=${ratingId}`);
    return response;
  } catch (error) {
    // Handle errors or exceptions here
    console.error('Error in getRatingById:', error);
    throw error;
  }
};
const getAllergen = async () => {
  try {
    const response = await Api.get(`/Allergen/GetAll`);
    return response;
  } catch (error) {
    // Handle errors or exceptions here
    console.error('Error in getRatingById:', error);
    throw error;
  }
};

export const productsService = {
  getFilteredProducts,
  getAllProducts,
  getProducts,
  getProductsCount,
  getProductById,
  deleteProduct,
  upsertProduct,
  getProductsNames,
  getShortView,
  getSimilarProducts,
  getProductReviewStatistics,
  getRatingById,
  getAllergen
};
