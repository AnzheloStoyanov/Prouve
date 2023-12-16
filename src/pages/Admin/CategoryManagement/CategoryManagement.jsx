import { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { categoriesService } from "src/services";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await categoriesService.getAllCategories();
      setCategories(response);
    };

    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory && !categories.includes(newCategory)) {
      const addedCategory = await categoriesService.upsertCategory({
        name: newCategory,
      });
      if (addedCategory) {
        setCategories([...categories, addedCategory]);
        setNewCategory("");
        setOpen(false);
      }
    }
  };

  const handleRemoveCategory = async (category) => {
    try{
      await categoriesService.deleteCategory(category.id);
      setCategories(categories.filter((cat) => cat.name !== category.name));
    }catch(ex){
      console.log(ex)
    }
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
        🍰 Category Management 🍰
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{
            borderRadius: "25px",
            backgroundColor: "#FFF",
            color: "#FF8E53",
            fontWeight: "bold",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onClick={() => setOpen(true)}
        >
          Add Category
        </Button>
      </div>
      <List style={{ maxWidth: "400px", margin: "0 auto" }}>
        {Array.isArray(categories) &&
          categories.map((category) => (
            <ListItem
              key={category.id}
              style={{
                border: "2px solid #2196F3",
                borderRadius: "15px",
                marginBottom: "10px",
                background: "#fef4f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                boxShadow: "3px 3px 5px rgba(0,0,0,0.2)",
              }}
            >
               <ListItemText
                primary={category.name}
                style={{
                  color: "#333",
                  fontWeight: "bold",
                }}
              />
              <Button
                startIcon={<DeleteIcon />}
                style={{
                  borderRadius: "25px",
                  borderColor: "#FF8E53",
                  color: "#FFF",
                  backgroundColor: "#FF8E53",
                }}
                variant="contained"
                onClick={() => handleRemoveCategory(category)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            label="Category Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleAddCategory}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;