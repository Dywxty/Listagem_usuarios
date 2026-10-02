import UserForm from "./UserForm";

function UserFormComponent({ onSubmit, erro, carregando }) {
    return (
        <UserForm
            onCadastrar={onSubmit}
            erro={erro}
            carregando={carregando}
        />
    );
}

export default UserFormComponent;
