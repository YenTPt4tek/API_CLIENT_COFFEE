const ProfileDropdown = ({ profile, handleLogout }) => {
    return (
        <li className="nav-item dropdown pe-3">
            <a href="a" className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                <img src={profile.avatar} className="rounded-circle" alt={`${profile.name}'s avatar`} />
                <span className="d-none d-md-block dropdown-toggle ps-2">{profile.name}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                    <h6>{profile.name}</h6>
                    <span>{profile.job}</span>
                </li>
                <li><hr className="dropdown-divider" /></li>

                <li>
                    <a className="dropdown-item d-flex align-items-center" href="#profile">
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                    </a>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li>
                    <a className="dropdown-item d-flex align-items-center" href="#settings">
                        <i className="bi bi-gear"></i>
                        <span>Account Settings</span>
                    </a>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li>
                    <a className="dropdown-item d-flex align-items-center" href="#logout" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
        </li>
    );
};

export default ProfileDropdown;
