import { usersService } from "src/services";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const userRoles = [
  "General Administrator",
  "Management Administrator",
  "Regular Administrator",
  "User",
];

export const getColumnsByRole = (role) => {
  const columns = [
    { field: "name", headerName: "Names", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "qrCode", headerName: "QR Code", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Saved Order Address", width: 200 },
    {
      field: "onlineExpense",
      headerName: "Online Expenses",
      width: 150,
      type: "number",
    },
    {
      field: "onSpotExpense",
      headerName: "On the Spot Expenses",
      width: 200,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total Expenses",
      width: 150,
      type: "number",
      valueGetter: (params) =>
        (params.row.onlineExpense + params.row.onSpotExpense).toFixed(2),
    },
  ];

  if (role === "General Administrator") {

    columns.push(
      {
        field: "role",
        headerName: "Role",
        width: 200,
        renderCell: (params) => (
          <Select
            value={params.row.role}
            onChange={(event) => handleRoleChange(params.row, event.target.value)}
            fullWidth
          >
            {userRoles.map((roleName) => (
              <MenuItem key={roleName} value={roleName}>
                {roleName}
              </MenuItem>
            ))}
          </Select>
        ),
      },
      {
        field: "suspend",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          const isSuspended = !params.row.isEnabled;
          return (
            <Button
              variant="contained"
              color={isSuspended ? "primary" : "secondary"}
              onClick={() => handleToggleUserStatus(params.row.id, isSuspended)}
            >
              {isSuspended ? "Enable" : "Suspend"}
            </Button>
          );
        },
      }
    );
  } else if (role === "Management Administrator") {
    // ... add columns or modifications specific to Management Administrator
  } else if (role === "Regular administrator") {
    // ... add columns or modifications specific to Regular administrator
  }

  return columns;
};

const handleToggleUserStatus = async (userId, isCurrentlySuspended) => {
  try {
    const action = isCurrentlySuspended ? "enable" : "suspend";
    const response = await usersService.toggleUserStatus(userId, action);

    if (response && response.success) {
      console.log(`User with ID ${userId} has been ${action}d!`);
    } else {
      console.error(`Failed to ${action} user with ID ${userId}.`);
    }
  } catch (error) {
    console.error(`An error occurred while trying to ${action} the user.`);
  }
};

const handleRoleChange = async (user, newRole) => {
  try {
    const response = await usersService.changeUserRole(user.id, newRole);
    if (response && response.success) {
      console.log(`User with ID ${user.id} role changed to ${newRole}!`);
    } else {
      console.error(`Failed to change role for user with ID ${user.id}.`);
    }
  } catch (error) {
    console.error("An error occurred while changing user role.");
  }
};