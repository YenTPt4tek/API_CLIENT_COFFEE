const NotificationDropdown = ({ notifications }) => {
    return (
        <li className="nav-item dropdown">
            <a href="a"  className="nav-link nav-icon" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">{notifications.length}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                    You have {notifications.length} new notifications
                </li>

                <li><hr className="dropdown-divider" /></li>

                {notifications.map(n => (
                    <li key={n.id} className="notification-item">
                        <i className={`bi ${n.icon} ${n.iconColor}`}></i>
                        <div>
                            <h4>{n.title}</h4>
                            <p>{n.message}</p>
                            <p>{n.time}</p>
                        </div>
                    </li>
                ))}

                <li className="dropdown-footer"><a href="#a">Show all notifications</a></li>
            </ul>
        </li>
    );
};

export default NotificationDropdown;
