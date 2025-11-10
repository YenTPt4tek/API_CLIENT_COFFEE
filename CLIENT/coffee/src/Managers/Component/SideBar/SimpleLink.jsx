import React from "react";

const SimpleLink = ({ href, icon, title }) => (
    <a className="nav-link" href={href}>
        <i className={`bi ${icon}`}></i>
        <span>{title}</span>
    </a>
);

export default SimpleLink;
