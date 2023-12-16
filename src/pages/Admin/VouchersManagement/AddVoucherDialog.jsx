import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
  } from "@mui/material";
  
  const AddVoucherDialog = ({
    open,
    newVoucher,
    setNewVoucher,
    handleAddVoucher,
    setOpen,
  }) => {
  
    const handleChange = (field) => (e) => {
      setNewVoucher({
        ...newVoucher,
        [field]: e.target.value,
      });
    };
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Voucher</DialogTitle>
        <DialogContent>
          <TextField
            label="Voucher Number"
            fullWidth
            value={newVoucher.number}
            onChange={handleChange("number")}
            margin="normal"
          />
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newVoucher.status}
              onChange={handleChange("status")}
            >
              <MenuItem value="used">Used</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
  
          <TextField
            label="Expiration Date"
            type="date"
            fullWidth
            value={newVoucher.expirationDate}
            onChange={handleChange("expirationDate")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
  
          <TextField
            label="Date Created"
            type="date"
            fullWidth
            value={newVoucher.createdDate}
            onChange={handleChange("createdDate")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
  
          <TextField
            label="User"
            fullWidth
            value={newVoucher.user}
            onChange={handleChange("user")}
            margin="normal"
          />
  
          <TextField
            label="Value"
            fullWidth
            value={newVoucher.value}
            onChange={handleChange("value")}
            margin="normal"
            helperText="For example: '10%' or '-100BGN'"
          />
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={newVoucher.type} onChange={handleChange("type")}>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="item">Item-specific</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleAddVoucher}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddVoucherDialog;
  