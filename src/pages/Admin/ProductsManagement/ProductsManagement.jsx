import { useState, useEffect } from "react";
import { ProductsList } from "src/components/AdminComponents";
import { Button } from "@mui/material";
import DeleteConfirmationDialog from "../BlogsManagement/DeleteConfirmationDialog";
import ProductDialog from "./ProductDialog";
import CircularProgress from "@mui/material/CircularProgress";
import {
  productsService,
  ingredientsService,
  allergensService,
  categoriesService,
} from "src/services";
import AddIcon from "@mui/icons-material/Add";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productsService.getAllProducts();
        const allIngredients = await ingredientsService.getAllIngredients();
        const allAllergens = await allergensService.getAllAllergens();
        const allCategories = await categoriesService.getAllCategories();
        setIngredients(allIngredients);
        setAllergens(allAllergens);
        setCategories(allCategories);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = async (newProduct) => {
    const data = await productsService.upsertProduct(newProduct);
    setProducts((prevProducts) => [...prevProducts, data]); 
    setCreateDialogOpen(false);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const data = await productsService.upsertProduct(updatedProduct);
    const updatedProducts = products.map((p) => (p.id === data.id ? data : p));
    setProducts(updatedProducts);
    setProductToEdit(null);
    setEditDialogOpen(false);
  };

  const handleDelete = async (productId) => {
    await productsService.deleteProduct(productId);
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const isEditMode = !!productToEdit;

  const handleDialogClose = () => {
    setProductToEdit(null);
    setCreateDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleDialogSubmit = (productData) => {
    if (isEditMode) {
      handleUpdateProduct(productData);
    } else {
      handleCreateProduct(productData);
    }
  };

  const promptDelete = (productId) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(productToDelete);
    setProductToDelete(null);
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
        🏬 Products Management 🏬
      </h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
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
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
              onClick={() => setCreateDialogOpen(true)}
            >
              Create New Product
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
            <ProductsList
              products={products}
              onDelete={promptDelete}
              onEdit={handleEdit}
            />
          </div>
          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={confirmDelete}
          />
          <ProductDialog
            open={createDialogOpen || editDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleDialogSubmit}
            initialData={productToEdit}
            title={isEditMode ? "Edit Product" : "Create Product"}
            ingredients={ingredients}
            allergens={allergens}
            categories={categories}
          />
        </>
      )}
    </div>
  );
};

export default ProductsManagement;
