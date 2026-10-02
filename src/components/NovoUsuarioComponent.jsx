
function NovoUsuarioComponent({ novoUsuario }){
    return(
        <section className="novo-usuario" aria-live="polite">
            <h2>Novo usuário cadastrado</h2>

            <p>
                <strong>Nome: </strong>{novoUsuario.name}
            </p>

            <p>
                <strong>Usuário: </strong>{novoUsuario.username}
            </p>

            <p>
                <strong>E-mail: </strong>{novoUsuario.email}
            </p>
            {novoUsuario.phone && (
                <p>
                    <strong>Telefone: </strong>{novoUsuario.phone}
                </p>
            )}
        </section>
    )
}

export default NovoUsuarioComponent