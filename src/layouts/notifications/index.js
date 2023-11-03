import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputAdornment from '@mui/material/InputAdornment';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import { Icon } from "@mui/material";


function Notifications() {
  const [title, setTitle] = useState();
  const [monthly_price, setMonthly_price] = useState();
  const [yearly_price, setYearly_price] = useState();
  const [services, setServices] = useState({
    predefinedTabs: false, customTabs: false, reminder: false
  });
  const [formVisible, setFormVisible] = useState(false);

  // const [successSB, setSuccessSB] = useState(false);
  // const [infoSB, setInfoSB] = useState(false);
  // const [warningSB, setWarningSB] = useState(false);
  // const [errorSB, setErrorSB] = useState(false);

  // const openSuccessSB = () => setSuccessSB(true);
  // const closeSuccessSB = () => setSuccessSB(false);
  // const openInfoSB = () => setInfoSB(true);
  // const closeInfoSB = () => setInfoSB(false);
  // const openWarningSB = () => setWarningSB(true);
  // const closeWarningSB = () => setWarningSB(false);
  // const openErrorSB = () => setErrorSB(true);
  // const closeErrorSB = () => setErrorSB(false);

  // const alertContent = (name) => (
  //   <MDTypography variant="body2" color="white">
  //     A simple {name} alert with{" "}
  //     <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
  //       an example link
  //     </MDTypography>
  //     . Give it a click if you like.
  //   </MDTypography>
  // );

  // const renderSuccessSB = (
  //   <MDSnackbar
  //     color="success"
  //     icon="check"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={successSB}
  //     onClose={closeSuccessSB}
  //     close={closeSuccessSB}
  //     bgWhite
  //   />
  // );

  // const renderInfoSB = (
  //   <MDSnackbar
  //     icon="notifications"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={infoSB}
  //     onClose={closeInfoSB}
  //     close={closeInfoSB}
  //   />
  // );

  // const renderWarningSB = (
  //   <MDSnackbar
  //     color="warning"
  //     icon="star"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={warningSB}
  //     onClose={closeWarningSB}
  //     close={closeWarningSB}
  //     bgWhite
  //   />
  // );

  // const renderErrorSB = (
  //   <MDSnackbar
  //     color="error"
  //     icon="warning"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={errorSB}
  //     onClose={closeErrorSB}
  //     close={closeErrorSB}
  //     bgWhite
  //   />
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} >
        {formVisible && (
          <Grid item xs={12} mb={5} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={9} lg={10.5}>
                    <MDTypography variant="h5">Create Plans</MDTypography>
                  </Grid>
                  <Grid item xs={3} lg={1.5} style={{ textAlign: 'right' }}>
                    <MDButton variant="" color="secondary" onClick={() => { setFormVisible(false) }}>
                      <Icon fontSize="small">close</Icon>
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={2} pb={2} px={2}
              // style={{ display: "flex", columnGap: "2%" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Title"
                      // fullWidth
                      // value={values[key]}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Monthly Price"
                      // fullWidth
                      style={{ width: "100%" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Yearly Price"
                      // fullWidth
                      style={{ width: "100%" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    // value={values[key]}
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={2} pb={2} px={2} style={{ display: "flex", columnGap: "2%" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      style={{ wordBreak: 'break-word', display: 'flex' }}
                      value="end"
                      control={<Checkbox />}
                      label="Predefined Tabs Templates"
                      labelPlacement="end"

                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      label="Add Custom Tabs"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      label="Appointments"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox />}
                      label="Enddd"
                      labelPlacement="end"

                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        )}
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <Grid container alignItems="center"> {/* This new container ensures the heading and button are in the same row */}
                  <Grid item xs={6}> {/* Adjust the width of the heading as needed */}
                    <MDTypography variant="h6" color="white">
                      Plans
                    </MDTypography>
                  </Grid>
                  {!formVisible && (
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <MDButton variant="gradient" color="secondary" onClick={() => { setFormVisible(true) }}>
                        <Icon fontSize="small">add</Icon>
                      </MDButton>
                    </Grid>
                  )}
                </Grid>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={() => { }} fullWidth>
                      success notification
                    </MDButton>
                    {/* {renderSuccessSB} */}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={() => { }} fullWidth>
                      info notification
                    </MDButton>
                    {/* {renderInfoSB} */}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={() => { }} fullWidth>
                      warning notification
                    </MDButton>
                    {/* {renderWarningSB} */}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={() => { }} fullWidth>
                      error notification
                    </MDButton>
                    {/* {renderErrorSB} */}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;