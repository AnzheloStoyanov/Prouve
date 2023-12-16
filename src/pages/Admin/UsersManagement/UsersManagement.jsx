import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { getColumnsByRole } from "./userColumns";
import styles from "./UsersManagement.module.css";
import { usersService } from "src/services";

const UsersManagement = ({ role }) => {
  const [users, setUsers] = useState();
  const columns = getColumnsByRole("General Administrator");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await usersService.getAllUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

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
        🚀 Users Management 🚀
      </h1>
      <Box
        sx={{
          height: 600,
          width: "100%",
          background:
            "radial-gradient(circle, rgba(34,70,66,1) 0%, rgba(56,115,111,1) 45%)",
          margin: "50px 0",
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
          color: "#FFF",
        }}
      >
        {Array.isArray(users) && users.length > 0 && (
          <DataGrid
            rows={users}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              !params.row.isEnabled ? styles.disabledRow : ""
            }
            className={styles.dataGrid}
          />
        )}
      </Box>
    </div>
  );
};

export default UsersManagement;

