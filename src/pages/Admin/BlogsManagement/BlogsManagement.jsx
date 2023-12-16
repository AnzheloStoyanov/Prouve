import { useState, useEffect } from "react";
import { BlogsList } from "src/components/AdminComponents";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import BlogDialog from "./BlogDialog";
import { blogsService } from "src/services";

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogsService.getAllBlogs();
      setBlogs(data);
    };
    fetchData();
  }, []);

  const handleCreateBlog = async (newBlog) => {
    const data = await blogsService.upsertBlog(newBlog);
    setBlogs((prevBlogs) => [...prevBlogs, data]);
    setCreateDialogOpen(false);
  };

  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    setEditDialogOpen(true);
  };

  const handleUpdateBlog = async (updatedBlog) => {
    const data = await blogsService.upsertBlog(updatedBlog);
    const updatedBlogs = blogs.map((b) => (b.id === data.id ? data : b));
    setBlogs(updatedBlogs);
    setBlogToEdit(null);
    setEditDialogOpen(false);
  };

  const handleDelete = async (blogId) => {
    await blogsService.deleteBlog(blogId);
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
    setBlogs(updatedBlogs);
  };

  const isEditMode = !!blogToEdit;

  const handleDialogClose = () => {
    setBlogToEdit(null);
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleDialogSubmit = (blogData) => {
    if (isEditMode) {
      handleUpdateBlog(blogData);
    } else {
      handleCreateBlog(blogData);
    }
  };

  const promptDelete = (blogId) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(blogToDelete);
    setBlogToDelete(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle, rgba(34,70,66,1) 0%, rgba(56,115,111,1) 45%)",
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
        color: "#FFF",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          margin: "50px 0",
          fontSize: "48px",
          textShadow: "3px 3px 5px rgba(0,0,0,0.2)",
        }}
      >
        📚 Blogs Management 📚
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{
            borderRadius: "25px",
            backgroundColor: "#FFF",
            color: "#36b0f4",
            fontWeight: "bold",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onClick={() => setCreateDialogOpen(true)}
        >
          Create New Blog
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {Array.isArray(blogs) && (
          <BlogsList
            blogs={blogs}
            onDelete={promptDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
      <BlogDialog
        open={createDialogOpen || editDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        initialData={blogToEdit}
        title={isEditMode ? "Edit Blog" : "Create Blog"}
      />
    </div>
  );
};

export default BlogsManagement;
