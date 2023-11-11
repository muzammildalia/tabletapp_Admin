import React, { useEffect, useState } from "react";

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
import { useMaterialUIController } from "context";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import { Icon } from "@mui/material";
import clientapi from "api/clientapi";
import toast from "react-hot-toast";
import { useAuth } from "context/auth";


function Notifications() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    darkMode,
  } = controller;
  const [auth] = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [monthly_price, setMonthly_price] = useState(0);
  const [yearly_price, setYearly_price] = useState(0);
  const [services, setServices] = useState({
    predefinedTabs: false, customTabs: false, reminder: false
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // const headers = auth.token
        const res = await clientapi.get(
          `plans/getplans`
        )
        if (res.data && res.data.length > 0) {
          setPlans(res.data);
          // toast.success("Plans Fetched Successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Fetching Plans");
      }
    }
    fetchPlans();
  }, [])
  const handleRefresh = () => {
    setFormVisible(false);
    setPlanId(undefined);
    setTitle("");
    setDescription("");
    setMonthly_price(0);
    setYearly_price(0);
    setServices({
      predefinedTabs: false,
      customTabs: false,
      reminder: false
    });
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setServices((prevServices) => ({
      ...prevServices,
      [name]: checked,
    }));
  };
  const handleSubmit = () => {
    if (!planId) {
      handleSave()
    } else {
      handleupdate()
    }
  }
  const handleSave = async () => {
    try {
      const res = await clientapi.post(
        `plans/create`,
        { title, description, monthly_price, yearly_price, services }
      );
      if (res && res.data.success === true) {
        const updatedres = await clientapi.get(
          `plans/getplans`
        )
        setPlans(updatedres.data)
        toast.success("Plan Created Successfully.!")
        handleRefresh();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // If it's a response error, extract the error message
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, "Error in Creation");
      } else {
        // If it's not a response error, handle it accordingly
        toast.error("An error occurred", "Error in Creation");
      }
    }
  }
  const handleupdate = async () => {
    try {
      const res = await clientapi.put(
        `plans/update/${planId}`,
        { title, description, monthly_price, yearly_price, services }
      )
      if (res && res.data.success) {
        const updatedres = await clientapi.get(
          `plans/getplans`
        )
        setPlans(updatedres.data)
        toast.success(res.data.message)
        handleRefresh();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // If it's a response error, extract the error message
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, "Error in updation");
      } else {
        // If it's not a response error, handle it accordingly
        toast.error("An error occurred", "Error in Update");
      }
    }
  }
  const handleDelete = async () => {
    try {
      const res = await clientapi.delete(
        `plans/remove/${planId}`
      )
      if (res && res.data.success) {
        const updatedres = await clientapi.get(
          `plans/getplans`
        )
        setPlans(updatedres.data)
        toast.success(res.data.message, "sucess")
        handleRefresh();
      }
    } catch (error) {
      if (error.response) {
        // If it's a response error, extract the error message
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, "Error in Deletion");
      } else {
        // If it's not a response error, handle it accordingly
        toast.error("An error occurred", "Error in Deletion");
      }
    }
  }
  const handleButtonClick = (plan) => {
    document.documentElement.scrollTop = 0;
    setFormVisible(true)
    setPlanId(plan._id);
    setTitle(plan.title);
    setDescription(plan.description);
    setMonthly_price(plan.monthly_price);
    setYearly_price(plan.yearly_price);
    const updatedServices = { ...services, ...plan.services[0] };
    setServices(updatedServices);
  }
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
                    <MDButton variant="gradient" color="secondary" onClick={() => { setFormVisible(false) }}>
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
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Description"
                      // fullWidth
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Monthly Price"
                      placeholder="Price"
                      value={monthly_price}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        // Use a regular expression to allow only numbers
                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                        setMonthly_price(numericValue);
                      }}
                      // fullWidth
                      style={{ width: "100%" }}
                      InputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon color={darkMode ? "white" : "black"} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDInput

                      id="outlined-read-only-input"
                      label="Yearly Price"
                      value={yearly_price}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        // Use a regular expression to allow only numbers
                        const numericValue = inputValue.replace(/[^0-9]/g, '');
                        setYearly_price(numericValue);
                      }}
                      style={{ width: "100%" }}
                      InputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon color={darkMode ? "white" : "black"} />
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
                      control={<Checkbox
                        name="predefinedTabs"
                        checked={services.predefinedTabs}
                        onChange={handleCheckboxChange}
                      />}
                      label="Predefined Tabs Templates"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      control={<Checkbox
                        name="customTabs"
                        checked={services.customTabs}
                        onChange={handleCheckboxChange}
                      />}
                      label="Add Custom Tabs"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControlLabel
                      control={<Checkbox
                        name="reminder"
                        checked={services.reminder}
                        onChange={handleCheckboxChange}
                      />}
                      label="Appointments"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox display="flex" justifyContent={planId ? "space-between" : "flex-end"} p={2}>
                {planId && (
                  <MDButton variant="gradient" color="error" onClick={() => { handleDelete() }}>
                    Delete
                  </MDButton>
                )}

                <MDButton variant="gradient" color="info" onClick={() => { handleSubmit() }}>
                  Submit
                </MDButton>
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
                  {/* {!formVisible && ( */}
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <MDButton variant="gradient" color="secondary" onClick={() => {
                      setFormVisible(true)
                      setPlanId(null);
                      setTitle("");
                      setDescription("");
                      setMonthly_price(0);
                      setYearly_price(0);
                      setServices({
                        predefinedTabs: false, customTabs: false, reminder: false
                      })
                    }}>
                      <Icon fontSize="small">add</Icon>
                      New
                    </MDButton>
                  </Grid>
                  {/* )} */}
                </Grid>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3} textAlign="center">
                  {plans
                    .sort((a, b) => a.monthly_price - b.monthly_price)
                    .map((plan, index) => (
                      <Grid key={plan._id} item xs={12} sm={6} lg={4}>
                        <MDButton
                          variant="gradient"
                          color={plan.monthly_price === "0" ? "success" : plan.monthly_price === "20" ? "warning" : "error"}
                          style={{ width: "100%", height: "100%" }}
                          onClick={() => { handleButtonClick(plan) }}
                        >
                          <Grid container direction="column">
                            <Grid item>
                              <MDTypography fontWeight="bold" textTransform="uppercase">
                                {plan.title}
                              </MDTypography>
                            </Grid>
                            <Grid item>

                              {plan.description === "" ? (
                                <MDTypography fontWeight="bold" textTransform="uppercase">
                                  No description
                                </MDTypography>
                              ) : (
                                <MDTypography fontWeight="bold" textTransform="uppercase">
                                  ({plan.description})
                                </MDTypography>
                              )}


                            </Grid>
                            <Grid item container alignItems="center" justifyContent="center" spacing={1}>
                              <Grid item>
                                <MDTypography fontWeight="bold" textTransform="uppercase" style={{ fontSize: "40px" }}>
                                  ${plan.monthly_price}
                                </MDTypography>
                              </Grid>
                              <Grid item>
                                <MDTypography fontWeight="light" textTransform="none">
                                  /mo
                                </MDTypography>
                              </Grid>
                            </Grid>
                            <Grid item container alignItems="center" justifyContent="center" spacing={1}>
                              <Grid item>
                                <MDTypography fontWeight="bold" textTransform="uppercase" style={{ fontSize: "40px" }}>
                                  ${plan.yearly_price}
                                </MDTypography>
                              </Grid>
                              <Grid item>
                                <MDTypography fontWeight="light" textTransform="none">
                                  /yr
                                </MDTypography>
                              </Grid>
                            </Grid>
                            <Grid item container alignItems="center" justifyContent="center" spacing={1}>
                              {plan.services.map((s, index) => (

                                <Grid item key={s._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: "column" }}>
                                  <MDTypography fontWeight="bold" textTransform="uppercase">
                                    <Checkbox checked={s.predefinedTabs} color="primary" />
                                    Predefined Tabs
                                  </MDTypography>
                                  <MDTypography fontWeight="bold" textTransform="uppercase">
                                    <Checkbox checked={s.customTabs} color="primary" />
                                    Custom Tabs
                                  </MDTypography>
                                  <MDTypography fontWeight="bold" textTransform="uppercase">
                                    <Checkbox checked={s.reminder} color="primary" />
                                    Reminder
                                  </MDTypography>
                                </Grid>

                              ))}
                            </Grid>
                          </Grid>
                        </MDButton>
                      </Grid>
                    ))}

                  {/* )} */}


                </Grid>
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout >
  );
}

export default Notifications;


{/* <Grid item>
                            <MDTypography fontWeight="light" textTransform="uppercase">
                              Monthly Price:
                            </MDTypography>
                          </Grid> */}

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


//  {renderSuccessSB} 
{/* <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={() => { }} fullWidth>
                      info notification
                    </MDButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={() => { }} fullWidth>
                      warning notification
                    </MDButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={() => { }} fullWidth>
                      error notification
                    </MDButton>
                    {renderErrorSB}
                  </Grid> */}