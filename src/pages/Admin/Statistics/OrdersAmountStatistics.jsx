import { useState, useEffect } from "react";
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
  Typography,
  IconButton,
  Collapse,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { statisticsService } from "src/services";

export default function OrdersAmountStatistics() {
  const [ordersData, setOrdersData] = useState([]);
  const [period, setPeriod] = useState("year");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const data = await statisticsService.getOrdersAmountStatistics(period);
        setOrdersData(data);
      } catch (error) {
        console.error("Failed to fetch order statistics", error);
      }
    };

    fetchOrderStats();
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4">
        Orders Amount Over Time
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
          <InputLabel id="period-select-label">Period</InputLabel>
          <Select
            labelId="period-select-label"
            value={period}
            onChange={handlePeriodChange}
            label="Period"
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={ordersData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={period} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Collapse>
    </div>
  );
}
