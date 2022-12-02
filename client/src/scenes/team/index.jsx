import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import React, { useEffect, useState } from "react";

const Team = () => {
  const [backendData, setBackendData] = useState([{}]);
  // console.log(backendData);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            className="text-base-content font-bold w-full flex justify-start py-1 px-1 my-2 bg-primary rounded-lg"
            backgroundColor={
              access === "admin"
                // ? colors.greenAccent[600]
                // : colors.greenAccent[700]
            }

          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon className="text-base-content"/>}
            {access === "manager" && <SecurityOutlinedIcon className="text-base-content"/>}
            {access === "user" && <LockOpenOutlinedIcon className="text-base-content"/>}
            {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}> */}
            <Typography className="pl-2">
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box className="mx-6">
      <div>
      <h1 className="text-primary text-6xl font-bold  uppercase">Team</h1>
      <h3 className="text-secondary text-2xl font-light">Manage your team</h3>
      {/*<Header color="primary" className="text-primary" title="TEAM" subtitle="Manage your team" /> */}
      </div>
      <Box
        className="m-5"
        // m="40px 0 0 0"
        height="75vh"
        sx={{
          // "& .MuiDataGrid-root": {
          //   border: "none",
          // },
          // "& .MuiDataGrid-cell": {
          //   borderBottom: "none",
          // },
          // "& .name-column--cell": {
          //    color: "primary",
          // },
          // "& .MuiDataGrid-columnHeaders": {
          //   backgroundColor: "primary",
          //   borderBottom: "none",
          // },
          // "& .MuiDataGrid-virtualScroller": {
          //    backgroundColor: "neutral",
          // },
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   // backgroundColor: colors.blueAccent[700],
          // },
          // "& .MuiCheckbox-root": {
          //   // color: `${colors.greenAccent[200]} !important`,
          // },
        }}
      >
        {/* <DataGrid rows={backendData} columns={columns} /> */}
        {typeof backendData.mockDataTeam === "undefined" ? (
          <p>loading...</p>
        ) : (
          // backendData.mockDataTeam.map((team, i) => (
          <DataGrid rows={backendData.mockDataTeam} columns={columns} />
          // ))
        )}
      </Box>
    </Box>
  );
};

export default Team;
