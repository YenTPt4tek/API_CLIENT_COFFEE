import React from "react";

const GroupLink = ({ id, icon, title, children }) => {
    const target = "#" + id + "-nav"; // nối chuỗi để tạo fragment id
    return (
        <>
            <a
                className="nav-link collapsed"
                data-bs-target={target}
                data-bs-toggle="collapse"
                href={target}              // valid navigable href -> fragment
                aria-controls={id + "-nav"}
            >
                <i className={`bi ${icon}`}></i>
                <span>{title}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
            </a>

            <ul id={id + "-nav"} className="nav-content collapse" data-bs-parent="#sidebar-nav">
                {children.map((c, i) => (
                    <li key={i}>
                        <a href={c.href}>
                            <i className="bi bi-circle"></i>
                            <span>{c.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default GroupLink;
