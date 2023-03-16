import React from "react";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import green from "@material-ui/core/colors/green";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import UseForm from "./UseForm";

const EnquiryForm = () => {
  const [fdate, setFdate] = React.useState(null);
  const { values, handleChange, handleSubmit, setValues } = UseForm();
  const inputBox = {
    margin: "0 auto",
    width: "100%",
    "& .MuiAlert-icon": {
      color: "white !important", // replace with your desired color
    },
    "& .MuiTextField-root": {
      m: 1.5,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "23ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#fffffe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
    },
    // marginLeft: "70px",
    justifyContent: "center",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    // height: {heightBox},
    flexGrow: 1,
    position: "relative",
    borderRadius: "10px",
    padding: "30px 20px 0 30px",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2FA0A4",
      },
      green: {
        main: "#094067",
      },
      success: {
        main: green[600],
      },
    },
  });

  const statusvalues = [
    "Trainer Needed",
    "Confrimed",
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
    "Not Able To Provide",
    "Need to Follow",
    "No Response",
    "Others",
  ];

  const enquiry = ["Email", "Mobile", "Email & Mobile"];
  const domain = ["Working Professional", "Corporate", "student", "fresher"];
  const mode = ["online", "offline", "both"];

  return (
    <>
      <Paper elevation={3} sx={inputBox}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            right: "3px",
            width: "100%",
            paddingBottom: "5px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%" }}>
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
              Enquiry Form
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
              Submit your form with your details
            </Typography>
          </div>
          <ThemeProvider theme={theme}>
            <ValidatorForm
              // instantValidate
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <Grid
                style={{
                  right: "10px",
                  paddingTop: "10px",
                  "& .MuiTypographyH6": {
                    fontSize: "12px",
                    lineHeight: "35px",
                    fontWeight: "600",
                  },
                  flexDirection: "column",
                  position: "relative",
                }}
                container
                direction="row"
                justify="center"
                alignItems="inherit"
              >
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Name"
                    size="small"
                    color="green"
                    type="text"
                    name="name"
                    required={true}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      orientation="landscape"
                      label="Follow Up Call Date"
                      openTo="day"
                      format="dd-MM-yyyy"
                      views={["day"]}
                      value={values.followupcalldate ? fdate : Date()}
                      onChange={(e) => {
                        const date = new Date(e);
                        const dates = moment(date).format("DD-MM-YYYY");
                        setFdate(date);
                        setValues({
                          ...values,
                          followupcalldate: `${dates}`,
                        });
                      }}
                      renderInput={(params) => (
                        <TextValidator
                          color="green"
                          size="small"
                          {...params}
                          helperText={null}
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Follow Up Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      name="followupstatus"
                      required={true}
                      value={values.followupstatus}
                      onChange={handleChange}
                    >
                      {statusvalues.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextValidator
                    label="Comments"
                    size="small"
                    multiline
                    color="green"
                    type="text"
                    name="comments"
                    required={true}
                    value={values.comments}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Enquiry By
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      name="enquiryby"
                      required={true}
                      value={values.enquiryby}
                      onChange={handleChange}
                    >
                      {enquiry.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextValidator
                    label="Mobile"
                    size="small"
                    color="green"
                    type="number"
                    name="mobile"
                    required={true}
                    value={values.mobile}
                    onChange={handleChange}
                    validators={["required", "matchRegexp:^[1-9][0-9]{9}$"]}
                    errorMessages={[
                      "Please enter 10 digit Mobile",
                      "Please enter 10 digit Mobile",
                    ]}
                  />
                  <TextValidator
                    label="Location"
                    size="small"
                    color="green"
                    type="text"
                    name="location"
                    required={true}
                    value={values.location}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Course"
                    size="small"
                    color="green"
                    type="text"
                    name="course"
                    required={true}
                    value={values.course}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Fee Structure"
                    size="small"
                    color="green"
                    type="text"
                    name="feestructure"
                    required={true}
                    value={values.feestructure}
                    onChange={handleChange}
                  />
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Experience/Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      name="exprienceby"
                      required={true}
                      value={values.exprienceby}
                      onChange={handleChange}
                    >
                      {domain.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextValidator
                    label="Info Source"
                    size="small"
                    color="green"
                    type="text"
                    name="infosource"
                    required={true}
                    value={values.infosource}
                    onChange={handleChange}
                  />
                  <TextValidator
                    label="Purpose"
                    size="small"
                    color="green"
                    type="text"
                    name="Purpose"
                    required={true}
                    value={values.purpose}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid style={{ dipslay: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel color="green" id="demo-simple-select-label">
                      Mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      color="green"
                      name="mode"
                      required={true}
                      value={values.mode}
                      onChange={handleChange}
                    >
                      {mode.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ positiion: "absolute", bottom: 0, width: "100%" }}>
                <Divider />
                <Stack spacing={2} direction="row">
                  <Button
                    sx={{ m: 2, width: "100px", color: "#FFFFFE" }}
                    variant="contained"
                    color="green"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{
                      m: 2,
                      width: "100px",
                      height: "38px",
                      top: "17px",
                      color: "#094067",
                    }}
                    variant="outlined"
                    color="green"
                    type="reset"
                  >
                    Clear
                  </Button>
                </Stack>
              </div>
            </ValidatorForm>
          </ThemeProvider>
        </div>
      </Paper>
    </>
  );
};

export default EnquiryForm;