import { useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "../BlogsManagement/DeleteConfirmationDialog";
import VoucherList from "./VoucherList";
import AddVoucherDialog from "./AddVoucherDialog";

const VouchersManagement = () => {
  const [vouchers, setVouchers] = useState([
    {
      number: "VOUCHER1234",
      status: "used",
      expirationDate: "2023-12-31",
      createdDate: "2023-01-01",
      user: "JohnDoe",
      type: "general",
      value: "10%",
    },
    {
      number: "VOUCHER5678",
      status: "active",
      expirationDate: "2023-06-30",
      createdDate: "2023-02-01",
      user: "",
      type: "item",
      value: "-50BGN",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    number: "",
    status: "pending",
    expirationDate: "",
    createdDate: "",
    user: "",
    type: "general",
    value: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);

  const handleAddVoucher = () => {
    if (
      newVoucher.number &&
      !vouchers.some((v) => v.number === newVoucher.number)
    ) {
      setVouchers([...vouchers, newVoucher]);
      setNewVoucher({
        number: "",
        status: "pending",
        expirationDate: "",
        createdDate: "",
        user: "",
        type: "general",
        value: "",
      });
      setOpen(false);
    }
  };

  const promptDelete = (voucherNumber) => {
    setVoucherToDelete(voucherNumber);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleRemoveVoucher(voucherToDelete);
    setVoucherToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleRemoveVoucher = (number) => {
    setVouchers(vouchers.filter((v) => v.number !== number));
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
        💸 Vouchers Management 💸
      </h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
          Add Voucher
        </Button>
      </div>

      <VoucherList vouchers={vouchers} promptDelete={promptDelete} />
      <AddVoucherDialog
        open={open}
        newVoucher={newVoucher}
        setNewVoucher={setNewVoucher}
        handleAddVoucher={handleAddVoucher}
        setOpen={setOpen}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default VouchersManagement;
