// src/Define/routeConfig.js

import DashboardPage from "../Page/DashboardPage";

export const routeConfig = {
   
    admin: {
        routes: [
            {
                path: "/admin",
                component: DashboardPage,
                allowedRoles: ["admin"],
                allowedPermissions: ["manage_orders", "manage_users", "view_reports"],
            },
        ],
    },

 
};
