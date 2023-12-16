import Api from "src/core/api";

const getAllCategories = async () => {
  const response = await Api.get("/category/getall");
  return response;
};

const getCategoryById = async (id) => {
  const response = await Api.get(`/category/getbyid/${id}`);
  return response;
};

const deleteCategory = async (id) => {
  const response = await Api.delete(`/category/delete/${id}`);
  return response;
};

const upsertCategory = async (category) => {
  const response = await Api.post("/category/upsert", category);
  return response;
};

export const categoriesService = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  upsertCategory,
};
