import { useState, useEffect } from "react";
import { ImageUpload } from "src/components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const reverseBadgeEnum = {
  0: "Favorite",
  1: "BestSelling",
  2: "KetoFriendly",
  3: "HighProtein",
  4: "ProductOfTheMonth",
  5: "New",
  6: "OutOfStock",
};

const badgeEnum = {
  Favorite: 0,
  BestSelling: 1,
  KetoFriendly: 2,
  HighProtein: 3,
  ProductOfTheMonth: 4,
  New: 5,
  OutOfStock: 6,
};

const ProductDialog = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
  categories,
  ingredients,
  allergens,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [calories, setCalories] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [price, setPrice] = useState("");
  const [files, setPhotos] = useState([]);
  const [hide, setHide] = useState(false);
  const [badge, setBadge] = useState(null);
  const [showOnHomepage, setShowOnHomepage] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.categoryId || "");
      setDescription(initialData.description);
      setSelectedIngredients(initialData.ingredients || []);
      setCalories(initialData.caloriesPer100Grams || "");
      setSelectedAllergens(initialData.allergens || []);
      setPrice(initialData.price);
      setPhotos(initialData.photos || []);
      setHide(initialData.hide);
      setBadge(initialData.badge ? badgeEnum[initialData.badge] : null);
      setShowOnHomepage(initialData.showOnHomepage);
    } else {
      setName("");
      setCategory("");
      setDescription("");
      setSelectedIngredients([]);
      setCalories("");
      setSelectedAllergens([]);
      setPrice("");
      setPhotos([]);
      setHide(null);
      setBadge(null);
      setShowOnHomepage(null);
    }
  }, [initialData]);

  const resetState = () => {
    setName("");
    setCategory("");
    setDescription("");
    setSelectedIngredients([]);
    setCalories("");
    setSelectedAllergens([]);
    setPrice("");
    setPhotos([]);
    setHide(false);
    setBadge("");
    setShowOnHomepage(false);
  };

  const handleSubmit = async () => {
    if (
      name &&
      category &&
      description &&
      selectedIngredients.length &&
      calories &&
      price
    ) {
      onSubmit({
        name,
        categoryId: category,
        description,
        ingredients: selectedIngredients,
        calories,
        allergens: selectedAllergens,
        price,
        files,
        hide,
        badge,
        showOnHomepage,
      });
      handleClose();
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleBadgeChange = (e) => {
    setBadge(badgeEnum[e.target.value]);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {initialData ? "Edit Product" : "Create New Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Ingredients</InputLabel>
          <Select
            multiple
            value={selectedIngredients || []}
            onChange={(e) => setSelectedIngredients([...e.target.value])}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
          >
            {ingredients.map((ingredient) => (
              <MenuItem key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Calories per 100g"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Allergens</InputLabel>
          <Select
            multiple
            value={selectedAllergens}
            onChange={(e) => setSelectedAllergens([...e.target.value])}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
          >
            {allergens.map((allergen) => (
              <MenuItem key={allergen.id} value={allergen.id}>
                {allergen.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {/* Currently not used <FormControlLabel
          control={
            <Checkbox
              checked={hide}
              onChange={() => setHide((prev) => !prev)}
            />
          }
          label="Hide if out of stock"
        /> */}

        <FormControl fullWidth margin="dense">
          <InputLabel>Badge</InputLabel>
          <Select
            value={badge !== null ? reverseBadgeEnum[badge] : ""}
            onChange={handleBadgeChange}
          >
            {Object.keys(badgeEnum).map((badgeName) => (
              <MenuItem key={badgeName} value={badgeName}>
                {badgeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={showOnHomepage}
              onChange={() => setShowOnHomepage((prev) => !prev)}
            />
          }
          label="Show on Home Page"
        />
        <ImageUpload files={files} setPhotos={setPhotos} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;