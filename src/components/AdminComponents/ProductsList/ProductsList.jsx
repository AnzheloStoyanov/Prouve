import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MAX_DESCRIPTION_LENGTH = 40; 

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ProductsList = ({ products, onDelete, onEdit }) => {
  if (!products || products.length === 0) {
    return (
      <Typography variant="h5" component="h2" align="center">
        No products available.
      </Typography>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {products.map((product) => (
        <Card key={product.id} style={{ width: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={product.photos?.[0]} 
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncateText(product.description, MAX_DESCRIPTION_LENGTH)}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Price: ${product.price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Category: {product.categories?.[0]?.name || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Calories: {product.caloriesPer100Grams} per 100g
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button onClick={() => onEdit(product)}>Edit</Button>  temp disabbled*/} 
            <Button size="small" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;