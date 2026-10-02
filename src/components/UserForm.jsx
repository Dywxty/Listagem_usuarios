import { useState } from "react";

function UserForm({ onCadastrar, erro, carregando }) {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    async function handleSubmit(evento) {
        evento.preventDefault();
        const novoUsuario = {
            name: nome.trim(),
            username: username.trim(),
            email: email.trim(),
            phone: telefone.trim()
        };

        const cadastrado = await onCadastrar(novoUsuario);
        if (cadastrado) {
            limparFormulario();
        }
    }

    function limparFormulario() {
        setNome("");
        setUsername("");
        setEmail("");
        setTelefone("");
    }

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>Cadastrar novo usuário</h2>

            <label htmlFor="novo-usuario-nome">
                Nome
                <input
                    id="novo-usuario-nome"
                    type="text"
                    autoComplete="name"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                    required
                />
            </label>

            <label htmlFor="novo-usuario-username">
                Nome de usuário
                <input
                    id="novo-usuario-username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(evento) => setUsername(evento.target.value)}
                    required
                />
            </label>

            <label htmlFor="novo-usuario-email">
                E-mail
                <input
                    id="novo-usuario-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                    required
                />
            </label>

            <label htmlFor="novo-usuario-telefone">
                Telefone (opcional)
                <input
                    id="novo-usuario-telefone"
                    type="tel"
                    autoComplete="tel"
                    value={telefone}
                    onChange={(evento) => setTelefone(evento.target.value)}
                />
            </label>

            {erro && <p className="cadastro-erro" role="alert">{erro}</p>}

            <button type="submit" disabled={carregando}>
                {carregando ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    );
}

export default UserForm;