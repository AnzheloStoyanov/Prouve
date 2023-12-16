import Api from "src/core/api";

const getAllIngredients = async () => {
  const response = await Api.get("/ingredient/getall");
  return response;
};

const getIngredientById = async (id) => {
  const response = await Api.get(`/ingredient/getbyid/${id}`);
  return response;
};

const deleteIngredient = async (id) => {
  const response = await Api.delete(`/ingredient/delete/${id}`);
  return response;
};

const upsertIngredient = async (ingredient) => {
  const response = await Api.post("/ingredient/upsert", ingredient);
  return response;
};

export const ingredientsService = {
  getAllIngredients,
  getIngredientById,
  deleteIngredient,
  upsertIngredient,
};