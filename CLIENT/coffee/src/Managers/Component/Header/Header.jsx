import NotificationDropdown from "./NotificationDropdown";
import MessageDropdown from "./MessageDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ user, notifications, messages, profile, handleLogout, onToggleSidebar }) => {
    return (
        <header id="header" className="header fixed-top d-flex align-items-center" data-aos="fade-down">

            <div className="d-flex align-items-center justify-content-between">
                <a href="#a" className="logo d-flex align-items-center">
                    <img src={process.env.REACT_APP_ADMIN_SRC + "/img/logo.png"} alt="logo" />
                    <span className="d-none d-lg-block">{user?.role.toUpperCase()}</span>
                </a>

                {/* Thêm onClick để toggle sidebar */}
                <i
                    className="bi bi-list toggle-sidebar-btn"
                    onClick={onToggleSidebar}
                    style={{ cursor: "pointer" }}
                ></i>
            </div>

            <div className="search-bar">
                <form className="search-form d-flex align-items-center">
                    <input type="text" placeholder="Search" />
                    <button type="submit"><i className="bi bi-search"></i></button>
                </form>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <NotificationDropdown notifications={notifications} />

                    <MessageDropdown messages={messages} />

                    <ProfileDropdown profile={profile} handleLogout={handleLogout} />

                </ul>
            </nav>
        </header>
    );
};

export default Header;
