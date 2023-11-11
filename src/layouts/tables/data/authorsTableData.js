import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import PropTypes from 'prop-types';

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import clientapi from "../../../api/clientapi";
import React, { useEffect, useState } from "react";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { toast } from "react-hot-toast";
import { useAuth } from "context/auth";

export default function data() {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState();
  const [refresh, setRefresh] = useState(false);
  const [auth] = useAuth();
  const { userId, token } = auth;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await clientapi.get(
          `admin/getusers`,
        );
        setData(res.data)
      } catch (error) {
        console.log('Error fetching user Tasks:', error);
      }
    };
    fetchUsers();
    const checkedValues = {};
    data.forEach(user => {
      checkedValues[user._id] = user.is_Active; // Assuming _id is a unique identifier for each user.
    });
    setChecked(checkedValues);
  }, [refresh]);
  const handleSwitchChange = async (userId) => {
    console.log(userId, "userId")
    // Create a copy of the data array
    const updatedData = [...data];
    // Find the user by ID
    const userToUpdate = updatedData.find((user) => user._id === userId);

    if (userToUpdate) {
      // Toggle the is_Active property
      userToUpdate.is_Active = !userToUpdate.is_Active;
      // Update the state with the new data
      setData(updatedData);
      try {
        // const headers = {
        //   Authorization: token
        // };
        const res = await clientapi.patch(`admin/change-status/${userId}`,
          { is_Active: userToUpdate.is_Active },
          // { headers }
        );
        if (res && res.data.success) {
          console.log(res.data.message);
          toast.success(res.data.message);
          setRefresh(!refresh);
        } else if (res && res.data.success === false) {
          console.log("Failed");
        }
      } catch (error) {
        console.log("Error updating task status", error);
        // toast.warning("Failed");
      }
    }
  };
  const Author = ({ name, email }) => {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
    )
  };
  Author.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );
  Job.propTypes = {
    title: PropTypes.string,
  };
  const rows = data.map((user, index) => ({
    user: <Author key={index} name={user.name} email={user.email} />,
    Plan: <Job title={user.plan} />,
    status: (
      <MDBox ml={-1} alignItems="center">
        <Switch
          checked={user.is_Active}
          onChange={() => handleSwitchChange(user._id)} // Pass the user's ID
        />
      </MDBox>
    ),
    registereddate: (
      <MDTypography component="a" href={user.employmentLink} variant="caption" color="text" fontWeight="medium">
        {user.createdAt}
      </MDTypography>
    ),
    // action: (
    //   <MDTypography component="a" href={user.editLink} variant="caption" color="text" fontWeight="medium">
    //     Edit
    //   </MDTypography>
    // ),
  }));
  const columns = [
    { Header: "user", accessor: "user", width: "45%", align: "left" },
    { Header: "Plan", accessor: "Plan", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "registered date", accessor: "registereddate", align: "center" },
    // { Header: "action", accessor: "action", align: "center" },
  ]
  return {
    columns,
    rows
  };
}
