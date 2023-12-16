import { Box, Grid, Paper } from "@mui/material";
import UsersByAgeGroups from "./Statistics/UsersByAgeGroups";
import ProductReviewStatistics from "./Statistics/ProductReviewStatistics";
import BestSellerStatistics from "./Statistics/BestSellerStatistics";
import OrdersAmountStatistics from "./Statistics/OrdersAmountStatistics";

const Admin = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle, rgba(34,70,66,1) 0%, rgba(56,115,111,1) 45%)",
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
        color: "#FFF",
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: "1rem" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              padding: (theme) => theme.spacing(1),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <OrdersAmountStatistics />
          </Paper>
        </Grid>

        {/* Placeholder for the other statistics components */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              padding: (theme) => theme.spacing(1),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <ProductReviewStatistics />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              padding: (theme) => theme.spacing(1),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <BestSellerStatistics />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              padding: (theme) => theme.spacing(1),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <UsersByAgeGroups />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
