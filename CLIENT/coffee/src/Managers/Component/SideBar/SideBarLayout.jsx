// ...existing code...
import React, { useMemo } from "react";
import SimpleLink from "./SimpleLink";
import GroupLink from "./GroupLink";
import { useAuth } from "../../../Hook/AuthContext/AuthContext";


// const navItems = [
//     { id: "dashboard", title: "Dashboard", icon: "bi-grid", href: "index.html" },

//     {
//         id: "components",
//         title: "Components",
//         icon: "bi-menu-button-wide",
//         children: [
//             "alerts", "accordion", "badges", "breadcrumbs", "buttons", "cards", "carousel",
//             "list-group", "modal", "tabs", "pagination", "progress", "spinners", "tooltips"
//         ].map(name => ({
//             title: name.replace(/-/g, " ").replace(/\b\w/g, s => s.toUpperCase()),
//             href: "components-" + name + ".html"
//         }))
//     },

//     {
//         id: "forms",
//         title: "Forms",
//         icon: "bi-journal-text",
//         children: [
//             { title: "Form Elements", href: "forms-elements.html" },
//             { title: "Form Layouts", href: "forms-layouts.html" },
//             { title: "Form Editors", href: "forms-editors.html" },
//             { title: "Form Validation", href: "forms-validation.html" },
//         ]
//     },

//     {
//         id: "tables",
//         title: "Tables",
//         icon: "bi-layout-text-window-reverse",
//         children: [
//             { title: "General Tables", href: "tables-general.html" },
//             { title: "Data Tables", href: "tables-data.html" },
//         ]
//     },

//     {
//         id: "charts",
//         title: "Charts",
//         icon: "bi-bar-chart",
//         children: [
//             { title: "Chart.js", href: "charts-chartjs.html" },
//             { title: "ApexCharts", href: "charts-apexcharts.html" },
//             { title: "ECharts", href: "charts-echarts.html" },
//         ]
//     },

//     {
//         id: "icons",
//         title: "Icons",
//         icon: "bi-gem",
//         children: [
//             { title: "Bootstrap Icons", href: "icons-bootstrap.html" },
//             { title: "Remix Icons", href: "icons-remix.html" },
//             { title: "Boxicons", href: "icons-boxicons.html" },
//         ]
//     },

//     { id: "profile", title: "Profile", icon: "bi-person", href: "users-profile.html" },
//     { id: "faq", title: "F.A.Q", icon: "bi-question-circle", href: "pages-faq.html" },
//     { id: "contact", title: "Contact", icon: "bi-envelope", href: "pages-contact.html" },
//     { id: "register", title: "Register", icon: "bi-card-list", href: "pages-register.html" },
//     { id: "login", title: "Login", icon: "bi-box-arrow-in-right", href: "pages-login.html" },
//     { id: "error", title: "Error 404", icon: "bi-dash-circle", href: "pages-error-404.html" },
//     { id: "blank", title: "Blank", icon: "bi-file-earmark", href: "pages-blank.html" },
// ];

const SidebarLayout = () => {
    const { user } = useAuth();

    // 🧠 Convert quyền → menu
    const navItems = useMemo(() => {
        if (!user?.info?.permissions) return [];

        const grouped = {};

        user.info.permissions.forEach(p => {
            const featureId = p.feature.feature_id;
            const featureName = p.feature.feature_name;

            if (!grouped[featureId]) {
                grouped[featureId] = {
                    id: featureId,
                    title: featureName,
                    icon: "bi-folder",
                    children: []
                };
            }

            grouped[featureId].children.push({
                title: p.description,
                href: `admin/${p.permission_name}`
            });
        });

        return Object.values(grouped);

    }, [user]);

    return (
        <aside id="sidebar" className="sidebar" data-aos="fade-right">
            <ul className="sidebar-nav" id="sidebar-nav">
                {navItems.map(item => (
                    <li className="nav-item" key={item.id}>
                        {item.children ? (
                            <GroupLink
                                id={item.id}
                                icon={item.icon}
                                title={item.title}
                                children={item.children}
                            />
                        ) : (
                            <SimpleLink
                                href={item.href}
                                icon={item.icon}
                                title={item.title}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SidebarLayout;
