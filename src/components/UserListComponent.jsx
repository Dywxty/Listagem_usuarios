import UserCardComponent from './UserCardComponent';

const UserListComponent = ({ usuarios, busca, erro }) => {
    return (
        <main className="user-list">
            {erro ? (
                <p className="user-list__error">{erro}</p>
            ) : (
                <>
                    <p className="user-list__summary">
                        {busca ? `Resultados para: "${busca}"` : 'Todos os usuários'}
                    </p>

                    {usuarios.length > 0 ? (
                        <ul className="user-list__grid">
                            {usuarios.map((usuario) => (
                                <UserCardComponent key={usuario.id} usuario={usuario} />
                            ))}
                        </ul>
                    ) : (
                        <p className="user-list__empty">Nenhum usuário encontrado.</p>
                    )}
                </>
            )}
        </main>
    );
};

export default UserListComponent;
