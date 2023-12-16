import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { statisticsService } from "src/services";

export default function BestSellerStatistics() {
  const [bestSellers, setBestSellers] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const bestSellerData =
          await statisticsService.getBestSellersStatistics();
        const formattedData = bestSellerData.map((item) => ({
          ...item,
          amount: Number(item.amount),
        }));
        setBestSellers(formattedData);
      } catch (error) {
        console.error("Failed to fetch best selling products", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div>
      <Typography variant="h4">
        Best Selling Products
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
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={bestSellers}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Collapse>
    </div>
  );
}
