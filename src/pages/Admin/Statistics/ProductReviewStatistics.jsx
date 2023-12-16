import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Collapse,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { statisticsService, productsService } from "src/services";

export default function ProductReviewStatistics() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await productsService.getProductsNames();
        setProducts(productList);

        if (productList && productList.length > 0) {
          const defaultProductId = productList[0].id;
          setSelectedProduct(defaultProductId);

          const reviews = await statisticsService.getProductReviewStatistics(
            defaultProductId
          );
          const formattedReviews = reviews.map((review) => ({
            date: review.dateRated,
            value: Number(review.value),
          }));
          setData(formattedReviews);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = async (event) => {
    const productId = event.target.value;
    setSelectedProduct(productId);

    try {
      const reviews = await statisticsService.getProductReviewStatistics(
        productId
      );
      const formattedReviews = reviews.map((review) => ({
        date: review.dateRated, // Assume review has a field "reviewDate"
        value: Number(review.value),
      }));
      setData(formattedReviews);
    } catch (error) {
      console.error("Failed to fetch product statistics", error);
    }
  };

  const aggregateReviews = (reviews) => {
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      ratingCounts[review.value]++;
    });

    return [
      { name: "1 Star", count: ratingCounts[1] },
      { name: "2 Stars", count: ratingCounts[2] },
      { name: "3 Stars", count: ratingCounts[3] },
      { name: "4 Stars", count: ratingCounts[4] },
      { name: "5 Stars", count: ratingCounts[5] },
    ];
  };

  return (
    <div>
      <Typography variant="h4">
        Product Reviews Over Time
        <IconButton
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="show more"
          sx={{
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Typography>
      <Collapse in={open}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={handleProductChange}
            label="Product"
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 5]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Collapse>
    </div>
  );
}
