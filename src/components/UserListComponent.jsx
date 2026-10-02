import UserCardComponent from "./UserCardComponent";
import "../styles.css";

function UserListComponent({
    usuarios,
    onSelecionarUsuario,
    onExcluirUsuario,
    usuarioEmExclusao
}) {
    return (
        <ul className="lista-usuarios">

            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                    onExcluirUsuario={onExcluirUsuario}
                    excluindo={usuarioEmExclusao === usuario.id}
                />
            ))}

        </ul>
    );
}

export default UserListComponent;