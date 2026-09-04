const UserCardComponent = ({ usuario }) => {
    return (
        <li className="user-card">
            <div className="user-card__content">
                <h2 className="user-card__name">{usuario.name}</h2>
                <p className="user-card__username">@{usuario.username}</p>
                <p className="user-card__email">{usuario.email}</p>
            </div>
        </li>
    );
};

export default UserCardComponent;
