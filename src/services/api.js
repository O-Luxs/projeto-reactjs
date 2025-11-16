const BASE_URL = 'http://localhost:3000';

/**
 * Busca a lista de dicas (LISTAGEM / GET)
 */
export const getTips = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tips`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dicas');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; 
  }
};

/**
 * Adiciona uma nova dica (CADASTRO / POST)
 * @param {object} tipData - O objeto { conceito, curiosidade }
 */
export const addTip = async (tipData) => {
  try {
    const response = await fetch(`${BASE_URL}/tips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipData),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar dica');
    }
    return await response.json(); 
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Deleta uma dica (EXCLUSÃO / DELETE)
 * @param {string} id - O ID da dica a ser deletada
 */
export const deleteTip = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/tips/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar dica');
    }
    
    // Retorna true para o componente saber que deu certo
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// --- MOCKUP DE DICAS ---

const TIPS_TO_POPULATE = [
  { conceito: "Props", curiosidade: "Props (propriedades) são 'read-only' e usadas para passar dados de um componente pai para um filho." },
  { conceito: "JSX", curiosidade: "JSX parece HTML, mas é na verdade 'syntax sugar' para React.createElement()." },
  { conceito: "React Hooks", curiosidade: "Hooks (como useState) só podem ser chamados no nível superior de funções de componente, não dentro de loops ou condições." },
  { conceito: "Fragmentos", curiosidade: "Use <React.Fragment> ou <>...</> para agrupar múltiplos elementos sem adicionar um nó extra ao DOM." },
  { conceito: "Keys", curiosidade: "A prop 'key' é essencial ao renderizar listas, ajudando o React a identificar quais itens mudaram, foram adicionados ou removidos." }
];

export const populateTips = async () => {
  console.log("API MOCK (POPULATE): Adicionando 5 dicas...");
  try {
    const promises = TIPS_TO_POPULATE.map(tip => addTip(tip));
    
    const newTips = await Promise.all(promises);

    const successfulTips = newTips.filter(tip => tip !== null);
    
    console.log(`API MOCK (POPULATE): ${successfulTips.length} dicas adicionadas.`);
    
    return successfulTips;

  } catch (error) {
    console.error("Erro ao popular dicas:", error);
    return [];
  }
};