import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";

import "./styles.css";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserFormComponent from "./components/UserFormComponent";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";


const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};


function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [erroDetalhes, setErroDetalhes] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState(null);
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [erroCadastro, setErroCadastro] = useState(null);
    const [cadastrando, setCadastrando] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState(null);
    const [deletarUsuario, setDeletarUsuario] = useState(null);
    const [erroDeletar, setErroDeletar] = useState(null);

    const usuariosFiltrados = usuarios
        .filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        setErroDetalhes(null);
        try {
            const usuarioLocal = usuarios.find((usuario) => usuario.id === id);
            if (usuarioLocal) {
                setUsuarioSelecionado(usuarioLocal);
                return;
            }

            const response = await axios.get(`${url}/users/${id}`);
            setUsuarioSelecionado(response.data);
        } catch (error) {
            setUsuarioSelecionado({ id });
            setErroDetalhes(
                `Não foi possível carregar os detalhes do usuário. Código: ${error.message}`
            );
        }
    }


    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(
                `${url}/users`
            );

            const data = response.data;

            setUsuarios(data);
        } catch (error) {
            console.log( 
                "Erro ao buscar usuários: ",
                error
            );
            setErro(
                `Não foi possível carregar os usuários. Código: ${error.message}`
            );
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null);
        setErroDetalhes(null);
    }

    async function removerUsuario(id) {
        setDeletarUsuario(id);
        setErroDeletar(null);

        try {
            await axios.delete(`${url}/users/${id}`);
            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter((usuario) => usuario.id !== id)
            );

            if (usuarioSelecionado?.id === id) {
                limparDetalhesUsuario();
            }

            if (novoUsuario?.id === id) {
                setNovoUsuario(null);
            }
        } catch (error) {
            setErroDeletar(
                `Não foi possível excluir o usuário. Código: ${error.message}`
            );
        } finally {
            setDeletarUsuario(null);
        }
    }

    async function cadastrarUsuario(usuario) {
        setCadastrando(true);
        setErroCadastro(null);
        setMensagemSucesso(null);

        try {
            const response = await axios.post(`${url}/users`, usuario);
            const data = { ...usuario, ...response.data };
            const idJaUtilizado = usuarios.some(
                (usuarioExistente) => usuarioExistente.id === data.id
            );

            if (idJaUtilizado) {
                data.id = Math.max(...usuarios.map((usuarioExistente) => usuarioExistente.id)) + 1;
            }

            setUsuarios((usuariosAtuais) => [...usuariosAtuais, data]);
            setNovoUsuario(data);
            setMensagemSucesso("Usuário cadastrado com sucesso!");
            return true;
        } catch (error) {
            setErroCadastro(
                `Não foi possível cadastrar o usuário. Código: ${error.message}`
            );
            return false;
        } finally {
            setCadastrando(false);
        }
    }

    async function cadastrarEFecharModal(usuario) {
        const cadastrado = await cadastrarUsuario(usuario);
        if (cadastrado) {
            setModalCadastroAberto(false);
        }
        return cadastrado;
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    useEffect(() => {
        if (!mensagemSucesso) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setMensagemSucesso(null);
        }, 7000);

        return () => clearTimeout(timeout);
    }, [mensagemSucesso]);


    return (
        <div className="app">
            <button
                className="botao-abrir-cadastro"
                type="button"
                onClick={() => {
                    setErroCadastro(null);
                    setModalCadastroAberto(true);
                }}
            >
                Cadastrar novo usuário
            </button>

            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />
            {mensagemSucesso && (
                <p className="mensagem-sucesso" role="status" aria-live="polite">
                    {mensagemSucesso}
                </p>
            )}
            {carregando && (
                <LoadingComponent />
            )}

            <p className="informacao">
                Usuários cadastrados: {usuarios.length}
            </p>

            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}


            {!carregando && !erro && (
                <>
                    <p className="informacao">
                        {usuariosFiltrados.length} usuário(s) encontrado(s)
                    </p>

                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onExcluirUsuario={removerUsuario}
                            usuarioEmExclusao={deletarUsuario}
                        />
                    ) : (
                        <p className="sem-resultados">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    {erroDeletar && (
                        <p className="erro" role="alert">{erroDeletar}</p>
                    )}

                    {usuarioSelecionado && (
                        <ModalComponent onFechar={limparDetalhesUsuario}>
                            {erroDetalhes ? (
                                <p className="erro" role="alert">{erroDetalhes}</p>
                            ) : (
                                <UserDetailsComponent
                                    usuario={usuarioSelecionado}
                                    onFecharDetalhes={limparDetalhesUsuario}
                                />
                            )}
                        </ModalComponent>
                    )}

                    {novoUsuario && (
                        <NovoUsuarioComponent novoUsuario={novoUsuario}/>
                    )}

                </>
            )}

            {modalCadastroAberto && (
                <ModalComponent
                    ariaLabel="Cadastrar novo usuário"
                    onFechar={() => setModalCadastroAberto(false)}
                >
                    <UserFormComponent
                        onSubmit={cadastrarEFecharModal}
                        erro={erroCadastro}
                        carregando={cadastrando}
                    />
                </ModalComponent>
            )}
        </div>
    );
}

export default App;