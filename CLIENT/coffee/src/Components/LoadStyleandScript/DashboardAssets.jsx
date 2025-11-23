import React from "react";
import { Helmet } from "react-helmet-async";

const DashboardAssets = ({ paths = [] }) => {
    const basePath = process.env.REACT_APP_ADMIN_SRC;

    const cssFiles = paths.filter(p => p.endsWith(".css"));
    return (
        <Helmet>
            {cssFiles.map((file, idx) => (
                <link key={idx} rel="stylesheet" href={`${basePath}/${file}`} />
            ))}
        </Helmet>
    );
};

export default DashboardAssets;
