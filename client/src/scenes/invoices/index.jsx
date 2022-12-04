import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
const Invoices = () => {
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography className="text-primary">
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <div className="pb-5">
      <h1 className="headTitle">Invoices</h1>
      <h3 className="underTitle">List of Invoices for Future Reference</h3>
      </div>
      {/* <Header
        title="Invoices"
        subtitle="List of Invoices for Future Reference"
      /> */}
      <Box
        className=""
        height="75vh"
      >
        {typeof backendData.mockDataInvoices === "undefined" ? (
          <p>loading...</p>
        ) : (
          <DataGrid
            rows={backendData.mockDataInvoices}
            checkboxSelection
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default Invoices;
