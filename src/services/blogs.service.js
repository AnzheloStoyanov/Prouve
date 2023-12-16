import Api from "src/core/api";

const getAllBlogs = async () => {
  const response = await Api.get("/Blog/GetAll");
  return response;
};

const getBlogById = async (id) => {
  const response = await Api.get(`/Blog/GetById?id=${id}`);
  return response;
};

const deleteBlog = async (id) => {
  const response = await Api.delete(`/blog/delete/${id}`);
  return response;
};

const upsertBlog = async (blog) => {
  const response = await Api.post("/blog/upsertWithPhotos", blog);
  return response;
};

export const blogsService = {
  getAllBlogs,
  getBlogById,
  deleteBlog,
  upsertBlog,
};
