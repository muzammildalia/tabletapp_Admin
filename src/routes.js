
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import React from 'react'
// @mui icons
import Icon from "@mui/material/Icon";
import PrivateRoute from "PrivateRoute";
import { useAuth } from "context/auth";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute element={<Dashboard />} />
    ),
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: (
      <PrivateRoute element={<Tables />} />
    ),
  },
  {
    type: "collapse",
    name: "Plans",
    key: "plans",
    icon: <Icon fontSize="small">event_list</Icon>,
    route: "/plans",
    component: (
      <PrivateRoute element={<Notifications />} />
    ),
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: (
      <PrivateRoute element={<Profile />} />
    ),
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: (
  //     <PrivateRoute element={<Billing />} />
  //   ),
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: (<SignIn />),
  },
  // {
  //   type: "collapse",
  //   name: "Sign Out",
  //   key: "sign-out",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: (() => { }),
  // },

];

export default routes;





// {
//   type: "collapse",
//   name: "RTL",
//   key: "rtl",
//   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//   route: "/rtl",
//   component: (
//     <PrivateRoute element={<RTL />} />
//   ),
// },
