
function UserDetailsComponent({ usuario, onFecharDetalhes }) {
    return(
        <div className="detalhes-usuario">
            <h2>Detalhes do usuário</h2>
            <button onClick={onFecharDetalhes}>Fechar detalhes</button>
            <p>
                <strong>Nome: </strong>{usuario.name}
            </p>

            <p>
                <strong>E-mail: </strong>{usuario.email}
            </p>

            <p>
                <strong>Cidade: </strong>{usuario.address?.city || "Não informada"}
            </p>

            <p>
                <strong>Telefone: </strong>{usuario.phone}
            </p>

            <p>
                <strong>Website: </strong>{usuario.website || "Não informado"}
            </p>
        </div>
    )
}

export default UserDetailsComponent