import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import  { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Unauthorized from "@/pages/Unauthorized";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "/about"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.superAdmin as TRole),
        path: '/admin',
        children: [...generateRoutes(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout,role.user as TRole),
        path: '/user',
        children: [
            ...generateRoutes(userSidebarItems)
        ]
    },

    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "register"
    },
    {
        Component: Verify,
        path: "verify"
    },
    {
        Component: Unauthorized,
        path: "unauthorized"
    }
])