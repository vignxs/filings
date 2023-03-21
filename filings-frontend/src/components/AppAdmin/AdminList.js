import React, { useEffect, useState, contextProvider } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CacheProvider } from "@emotion/react";
import moment from "moment";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
// import { UsersActions } from "./AdminActions";
import { Button, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  AccessTimeRounded,
  ArrowRightAltRounded,
  GroupRounded,
  PersonRounded,
  SupportAgentRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import { useValue } from "../../Context/ContextProvider";
import { getRequests } from "../../Context/actions";



export const AdminList = () => {
  const inputBox = {
    "& .MuiDataGrid-toolbarQuickFilter": {
      "& .MuiTextField-root": {
        // m: 2,
        // borderRadius:'15px',
        backgroundColor: "#fffffe",
        borderRadius: "2px",
        width: "70ch",
      },
      borderRadius: "5px",
      width: "70ch",
    },
    "& .MuiPopperUnstyled-root": {
      inset: `-5px auto auto 350px`,
    },
    "& .MuiDataGrid-panel": {
      inset: `-1px auto auto 350px`,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      opacity: ".8",
      // backgroundColor: "rgba(255, 7, 0, 0.55)",
      fontWeight: "700",
    },
    "& .MuiDataGrid-toolbarContainer ": {
      // top: "-69px",
      // left: "808px",
      justifyContent: "space-between",
      backgroundColor: "rgba(145, 158, 171, 0.12)",
      borderRadius: "10px",
      // position: "relative",
    },
    "& .MuiDataGrid-main ": {
      // top: "-38px",
      // backgroundColor: "rgba(255, 7, 0, 0.55)",
      // position: "relative",
    },
    margin: "0 auto",
    width: "100%",
    "& .MuiTextField-root": {
      m: 2,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "40ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#d8eefe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    // marginLeft: "70px",
    justifyContent: "center",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // boxShadow: `rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    height: "700px",
    flexGrow: 1,
    position: "relative",
    borderRadius: "12px",
    padding: "30px",
  };

  const date = new Date();
  const getMuiTheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#094067",
        },
        green: {
          main: "#094067",
        },
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
        textcolor: {
          main: "#fffffe",
        },
      },
    });

  const {
    state: { requests },
    dispatch,
  } = useValue();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const enqColumns = useMemo(
    () => [
    //   {
    //     field: "actions",
    //     headerName: "",
    //     type: "actions",
    //     width: 130,
    //     filterable: true,
    //     // renderCell: (params) => (
    //     // //   <UsersActions {...{ params, rowId, setRowId }} />
    //     // ),
    //   },
      {
        field: "req_id",
        headerName: "ReqId",
        width: 100,
        sortable: false,
        headerAlign: "center",
        align: "center",
        filterable: true,
      },
      {
        field: "first_name",
        headerAlign: "center",
        align: "center",
        filterable: true,
        headerName: "Name",
        width: 120,
      },
      // "last_name",
      // "mobile",
      {
        field: "mobile",
        headerAlign: "center",
        align: "center",
        headerName: "Mobile",
        width: 100,
        filterable: false,
      },
      {
        field: "email",
        headerAlign: "center",
        align: "center",
        headerName: "Email",
        width: 160,
        filterable: true,
      },
      // "address",
      // "city",
      // "pincode",
      {
        field: "enquired_for",
        headerName: "Enquired For",
        headerAlign: "center",
        align: "center",
        width: 160,
        sortable: true,
        filterable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        headerAlign: "center",
        align: "center",
        valueOptions: ["In-Progress", "Created", "Closed"],
        editable: true,
        filterable: false,
        // currentUser?.role === "admin",
      },
      {
        field: "created_at",
        headerName: "CreatedAt",
        width: 180,
        headerAlign: "center",
        filterable: false,
        align: "center",
        // valueFormatter: (params) => formatDate(params.value),
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        // currentUser?.role === "admin",
      },
      {
        field: "updated_at",
        headerName: "UpdatedAt",
        width: 180,
        headerAlign: "center",
        align: "center",
        filterable: false,
        // valueFormatter: (params) => formatDate(params.value),
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        // currentUser?.role === "admin",
      },
    ],
    [rowId]
  );

  useEffect(() => {
    if (requests.length === 0) getRequests(dispatch);
  }, []);

  // .MuiDataGrid-cell:focus {
  //     outline: solid #094067 1px;
  //     border-radius: 12px;
  // }
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ background: "#000000" }}>
        <GridToolbarQuickFilter sx={{ marginRight: "auto" }} />
        {/* <GridToolbarColumnsButton /> */}
        <GridToolbarFilterButton
          PopperProps={{ color: "#000000", inset: `-5px auto auto 350px` }}
          sx={{ m: 2, bgcolor: "#FFFFFF", marginLeft: "auto" }}
        />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport sx={{ m: 2, bgcolor: "#FFFFFF" }} />
      </GridToolbarContainer>
    );
  }
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Paper
        elevation={3}
        // border={1} borderColor="#094067"
        sx={inputBox}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            position: "relative",
            right: "3px",
            width: "100%",
            paddingBottom: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              variant="h6"
              color={"#ef4565"}
              sx={{
                padding: "4px",
                fontWeight: "bold",
                fontSize: "23px",
                flexGrow: 1,
                fontFamily: "Nunito Sans",
              }}
              noWrap
              component="h3"
            >
              Users List
            </Typography>

            <Typography
              variant="p"
              color={"#000000"}
              sx={{
                paddingLeft: "4px",
                fontWeight: "400",
                fontSize: "15px",
                opacity: ".8",
                flexGrow: 1,
                fontFamily: "Nunito Sans",
              }}
              noWrap
              component="h3"
            >
              Manage your users detail and status
            </Typography>
          </div>

          <div>
            <Button
              to="/user-form"
              component={Link}
              size="small"
              color="secondary"
              sx={{ height: "30px", width: "150px", color: "#FFFFFE" }}
              startIcon={<AddIcon color="textcolor" />}
              onClick={window.scrollTo(0, 0)}
              variant="contained"
            >
              create user
            </Button>
          </div>
        </div>
        {/* <Divider /> */}
        <Box height={595}>
          <DataGrid
            sx={{ border: 0 }}
            columns={enqColumns}
            rows={requests}
            getRowId={(row) => row.req_id}
            rowsPerPageOptions={[10, 20, 30]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: CustomToolbar }}
            disableColumnMenu
            componentsProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 250 },
              },
              panel: {
                sx: {
                  inset: `-18vh auto auto 25vw !important`,
                  width: "35vw",
                  "& .mui-datatables-1t5wrdm-MuiDataGrid-filterForm": {
                    width: "35vw",
                  },
                },
              },
            }}
            // experimentalFeatures={{ newEditingApi: true }}
            // getRowSpacing={(params) => ({
            //   top: params.isFirstVisible ? 0 : 5,
            //   bottom: params.isLastVisible ? 0 : 5,
            // })}
            onCellEditCommit={(params) => setRowId(params.id)}
          />
        </Box>
      </Paper>
    </ThemeProvider>

    // </userContext.Provider>
  );
}
