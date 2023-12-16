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
import { ingredientsService } from "src/services";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "../BlogsManagement/DeleteConfirmationDialog";

const IngredientsManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    description: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await ingredientsService.getAllIngredients();
      setIngredients(response);
    };
    fetchIngredients();
  }, []);

  const handleAddIngredient = async () => {
    if (
      newIngredient.name &&
      !ingredients.some((ing) => ing.name === newIngredient.name)
    ) {
      const response = await ingredientsService.upsertIngredient(newIngredient);
      if (response && response.id) {
        setIngredients([...ingredients, { ...newIngredient, id: response.id }]);
      }
      setNewIngredient({ name: "", description: "" });
      setOpen(false);
    }
  };

  const promptDelete = (ingredientName) => {
    setIngredientToDelete(ingredientName);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleRemoveIngredient(ingredientToDelete);
    setIngredientToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleRemoveIngredient = async (name) => {
    const ingredient = ingredients.find((ing) => ing.name === name);
    if (ingredient && ingredient.id) {
      await ingredientsService.deleteIngredient(ingredient.id);
      setIngredients(ingredients.filter((ing) => ing.id !== ingredient.id));
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
        🍓 Ingredients Management 🍓
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
            color: "#2196F3",
            fontWeight: "bold",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onClick={() => setOpen(true)}
        >
          Add Ingredient
        </Button>
      </div>

      <List style={{ maxWidth: "600px", margin: "0 auto" }}>
        {ingredients.map((ingredient) => (
          <ListItem
            key={ingredient.id}
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
              primary={ingredient.name}
              secondary={ingredient.description}
              style={{
                color: "#333",
                fontWeight: "bold",
              }}
            />
            <Button
              startIcon={<DeleteIcon />}
              style={{
                borderRadius: "25px",
                borderColor: "#2196F3",
                color: "#FFF",
                backgroundColor: "#2196F3",
              }}
              variant="contained"
              onClick={() => promptDelete(ingredient.name)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Ingredient</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            label="Ingredient Name"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            value={newIngredient.description}
            onChange={(e) =>
              setNewIngredient((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            label="Ingredient Description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleAddIngredient}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default IngredientsManagement;
