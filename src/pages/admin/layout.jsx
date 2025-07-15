import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CreateIcon from '@mui/icons-material/Create';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
const NAVIGATION = [
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin",
    title: "Tasks",
    icon: <FormatListNumberedRtlIcon />,
    children: [
      {
        segment: "task-create",
        title: "Create",
        icon: <CreateIcon />,
      },
      {
        segment: "view-tasks",
        title: "View Tasks",
        icon: <WysiwygIcon />,
      },
    ],
  },
  {
    segment: "admin",
    title: "Employees",
    icon: <PeopleAltIcon />,
    children: [
      {
        segment: "emp-create",
        title: "Create",
        icon: <CreateIcon />,
      },
      {
        segment: "view-emp",
        title: "View Employees",
        icon: <WysiwygIcon />,
      },
    ],
  },
  {
    segment: "admin/logout",
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

const AdminLayout = () => {
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
        <Outlet />
      </DashboardLayout>
    </AppProvider>
 
  );
};

export default AdminLayout;
