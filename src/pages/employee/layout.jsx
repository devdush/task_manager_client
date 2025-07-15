import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import CreateIcon from "@mui/icons-material/Create";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const NAVIGATION = [
  {
    segment: "employee/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "employee/tasks",
    title: "Tasks",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "employee/logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

const demoTheme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
const EmployeeLayout = () => {
  const [pathname, setPathname] = React.useState("/dashboard");

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: "",
        title: "TASK MANAGER",
      }}
    >
      <DashboardLayout>
        {/* <Typography>Dashboard content for {pathname}</Typography> */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
};

export default EmployeeLayout;
