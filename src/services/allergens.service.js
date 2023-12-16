import Api from "src/core/api";

const getAllAllergens = async () => {
  const response = Api.get("/allergen/getall");
  return response;
};

const getUserAllergens = async () => {
  const response = Api.get("/userallergen/getallergensforuser");
  return response;
};

const getAllergenById = async (id) => {
  const response = await Api.get(`/allergen/getbyid/${id}`);
  return response;
};

const deleteAllergen = async (id) => {
  const response = await Api.delete(`/allergen/delete/${id}`);
  return response;
};

const upsertAllergen = async (allergen) => {
  const response = await Api.post("/allergen/upsert", allergen);
  return response;
};

export const allergensService = {
  getAllAllergens,
  getAllergenById,
  deleteAllergen,
  upsertAllergen,
  getUserAllergens
};