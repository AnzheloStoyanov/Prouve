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
import { allergensService } from "src/services";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "../BlogsManagement/DeleteConfirmationDialog";

const AllergensManagement = () => {
  const [allergens, setAllergens] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAllergen, setNewAllergen] = useState("");
  const [allergenToDelete, setAllergenToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const response = await allergensService.getAllAllergens();
        setAllergens(response);
      } catch (error) {
        console.error("Failed to fetch allergens:", error);
      }
    };
    fetchAllergens();
  }, []);

  const handleAddAllergen = async () => {
    if (newAllergen && !allergens.includes(newAllergen)) {
      try {
        const response = await allergensService.upsertAllergen({
          name: newAllergen,
        });
        setAllergens([...allergens, response]);
        setNewAllergen("");
        setOpen(false);
      } catch (error) {
        console.error("Failed to add allergen:", error);
      }
    }
  };

  const handleRemoveAllergen = (allergen) => {
    setAllergens(allergens.filter((alg) => alg !== allergen));
  };

  const promptDelete = (allergen) => {
    setAllergenToDelete(allergen);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await allergensService.deleteAllergen(allergenToDelete?.id);
      handleRemoveAllergen(allergenToDelete);
      setAllergenToDelete(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete allergen:", error);
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
        🚫 Allergens Management 🚫
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
            color: "#F44336",
            fontWeight: "bold",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          onClick={() => setOpen(true)}
        >
          Add Allergen
        </Button>
      </div>
      <List style={{ maxWidth: "400px", margin: "0 auto" }}>
        {allergens.map((allergen) => (
          <ListItem
            key={allergen.id}
            style={{
              border: "2px solid #F44336",
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
              primary={allergen.name}
              style={{
                color: "#333",
                fontWeight: "bold",
              }}
            />
            <Button
              startIcon={<DeleteIcon />}
              style={{
                borderRadius: "25px",
                borderColor: "#F44336",
                color: "#FFF",
                backgroundColor: "#F44336",
              }}
              variant="contained"
              onClick={() => promptDelete(allergen)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Allergen</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newAllergen}
            onChange={(e) => setNewAllergen(e.target.value)}
            label="Allergen Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleAddAllergen}>
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

export default AllergensManagement;
