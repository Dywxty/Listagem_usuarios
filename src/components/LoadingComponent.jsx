const LoadingComponent = () => {
    return (
        <div className="loading">
            <div className="loading__spinner" aria-label="Carregando" />
            <p className="loading__text">Carregando usuários...</p>
        </div>
    );
};

export default LoadingComponent;
