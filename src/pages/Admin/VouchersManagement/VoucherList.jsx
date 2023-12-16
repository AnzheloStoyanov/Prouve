import { List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const VoucherList = ({ vouchers, promptDelete }) => {
  return (
    <List style={{ maxWidth: "800px", margin: "0 auto" }}>
      {vouchers.map((voucher) => (
        <ListItem
          key={voucher.number}
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
            primary={`Voucher: ${voucher.number}`}
            secondary={`Status: ${voucher.status}, Type: ${voucher.type}`}
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
            onClick={() => promptDelete(voucher.number)}
          >
            Remove
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default VoucherList;
