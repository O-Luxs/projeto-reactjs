import { useState, useEffect } from 'react';
import * as api from './services/api'; 
import './App.css';

function App() {
  
  const [dicas, setDicas] = useState([]);
  const [conceito, setConceito] = useState('');
  const [curiosidade, setCuriosidade] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPopulating, setIsPopulating] = useState(false);

  // --- FUNÇÕES DE DADOS ---
  const fetchDicas = async () => {
    setLoading(true);
    const dados = await api.getTips();
    setDicas(dados);
    setLoading(false);
  };

  useEffect(() => {
    fetchDicas(); 
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const novaDica = { conceito, curiosidade };
    const dicaAdicionada = await api.addTip(novaDica);

    if (dicaAdicionada) {
      setDicas(dicasAtuais => [dicaAdicionada, ...dicasAtuais]);
      setConceito('');
      setCuriosidade('');
    }
  };

  const handleDelete = async (idParaDeletar) => {
    const sucesso = await api.deleteTip(idParaDeletar);
    if (sucesso) {
      setDicas(dicasAtuais => 
        dicasAtuais.filter(dica => dica.id !== idParaDeletar)
      );
    } else {
      alert("Erro ao deletar a dica. Verifique o console.");
    }
  };

  const handlePopulate = async () => {
    setIsPopulating(true);
    const newlyCreatedTips = await api.populateTips();
    if (newlyCreatedTips.length > 0) {
      setDicas(dicasAtuais => [...newlyCreatedTips.reverse(), ...dicasAtuais]);
    }
    setIsPopulating(false);
  };

  // --- RENDERIZAÇÃO ---
  const isInteragindo = loading || isPopulating;

  return (
    <div className="App">
      <h1>Mural de Curiosidades React</h1>
      
      <fieldset disabled={isInteragindo}>
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Cadastrar Nova Dica</h2>
          
          <div className="form-group">
            <label htmlFor="conceitoInput">Conceito</label>
            <input
              id="conceitoInput"
              type="text"
              className="form-control"
              placeholder="Ex: useState"
              value={conceito}
              onChange={(e) => setConceito(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="curiosidadeInput">Curiosidade</label>
            <textarea
              id="curiosidadeInput"
              className="form-control"
              placeholder="Ex: Retorna um array [valor, setValor]"
              rows="3"
              value={curiosidade}
              onChange={(e) => setCuriosidade(e.target.value)} 
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Cadastrar Dica
          </button>
        </form>
      </fieldset>

      <div className="test-container">
        <h4>Área de Teste</h4>
        <p>Use este botão para popular a API com 5 dicas de exemplo.</p>
        <button 
          onClick={handlePopulate} 
          disabled={isInteragindo}
          className="btn btn-secondary"
        >
          {isPopulating ? 'Populando...' : 'Popular com 5 Dicas'}
        </button>
      </div>

      <div className="header-lista">
        <h2>Dicas Cadastradas</h2>
        <button 
          onClick={fetchDicas} 
          disabled={isInteragindo}
          className="btn btn-secondary"
        >
          {loading ? 'Buscando...' : 'Atualizar Lista'}
        </button>
      </div>
      
      {(loading && dicas.length === 0) && (
        <div className="empty-state">Carregando dicas...</div>
      )}

      {(!loading && dicas.length === 0) && (
         <div className="empty-state">
          Nenhuma dica cadastrada. Use o formulário ou o botão "Popular".
         </div>
      )}

      <div className="lista-dicas">
        {dicas.map(dica => (
          <div key={dica.id} className="dica-card">
            
            <button 
              onClick={() => handleDelete(dica.id)}
              disabled={isInteragindo}
              className="btn btn-danger"
              aria-label="Deletar dica"
            >
              &times;
            </button>
            
            <h3>{dica.conceito}</h3>
            <p>{dica.curiosidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;