const MessageDropdown = ({ messages }) => {
    return (
        <li className="nav-item dropdown">
            <a href="a" className="nav-link nav-icon" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">{messages.length}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                    You have {messages.length} new messages
                </li>

                <li><hr className="dropdown-divider" /></li>

                {messages.map(m => (
                    <li key={m.id} className="message-item">
                        <a href="#a">
                            <img src={m.avatar} className="rounded-circle" alt={`${m.name}'s avatar`} />
                            <div>
                                <h4>{m.name}</h4>
                                <p>{m.text}</p>
                                <p>{m.time}</p>
                            </div>
                        </a>
                    </li>
                ))}

                <li className="dropdown-footer"><a href="#a">Show all messages</a></li>
            </ul>
        </li>
    );
};

export default MessageDropdown;
