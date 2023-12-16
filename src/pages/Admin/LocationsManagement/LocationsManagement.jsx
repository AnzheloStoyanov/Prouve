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
import { locationsService } from "src/services";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "../BlogsManagement/DeleteConfirmationDialog";

const LocationsManagement = () => {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({
    address: "",
    googleMapsLink: "",
  });
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await locationsService.getAllLocations();
      setLocations(response);
    };
    fetchData();
  }, []);

  const handleAddLocation = async () => {
    if (newLocation.address && !locations.some(loc => loc.address === newLocation.address)) {
      const addedLocation = await locationsService.upsertLocation(newLocation);
      if (addedLocation) {
        setLocations([...locations, addedLocation]);
        setNewLocation({
          address: "",
          googleMapsLink: "",
        });
        setOpen(false);
      }
    }
  };

  const handleRemoveLocation = async (location) => {
    try {
      await locationsService.deleteLocation(location.id);
      setLocations(locations.filter(loc => loc.id !== location.id));
    } catch (ex) {
      console.log(ex);
    }
  };

  const promptDelete = (location) => {
    setLocationToDelete(location);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleRemoveLocation(locationToDelete);
    setLocationToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle, rgba(34,70,66,1) 0%, rgba(56,115,111,1) 45%)",
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
        🌍 Locations Management 🌍
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
          Add Location
        </Button>
      </div>

      <List style={{ maxWidth: "600px", margin: "0 auto" }}>
        {locations.map((location) => (
          <ListItem
            key={location.id}
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
              primary={location.address}
              secondary={<a href={location.googleMapsLink} target="_blank" rel="noopener noreferrer">View on Google Maps</a>}
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
              onClick={() => promptDelete(location)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newLocation.address}
            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
            label="Location Address"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            value={newLocation.googleMapsLink}
            onChange={(e) => setNewLocation({ ...newLocation, googleMapsLink: e.target.value })}
            label="Google Maps Link"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleAddLocation}>
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

export default LocationsManagement;
