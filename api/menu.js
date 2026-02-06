
export default async function handler(req, res) {
  // Variáveis de ambiente padrão do Vercel KV / Upstash
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  
  // Chave de armazenamento definida conforme solicitado
  const KV_KEY = 'menu_pizzaria'; 

  // Configuração de Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação das credenciais
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    console.error("ERRO: Variáveis de ambiente KV não configuradas.");
    return res.status(500).json({ error: 'Erro de infraestrutura: Credenciais ausentes.' });
  }

  try {
    // MÉTODO GET: Recuperar o menu para exibição na App
    if (req.method === 'GET') {
      const kvResponse = await fetch(`${KV_REST_API_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
      });
      
      const data = await kvResponse.json();
      let menu = null;
      if (data.result) {
        // Upstash pode retornar como string se foi salvo via JSON.stringify
        menu = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
      return res.status(200).json({ menu });
    }

    // MÉTODO POST: Atualizar o menu (Ação do Botão Administrador)
    if (req.method === 'POST') {
      const menuData = req.body;
      
      if (!menuData) {
        return res.status(400).json({ error: 'Dados do menu não fornecidos.' });
      }

      // Envio para o banco de dados Upstash
      const response = await fetch(`${KV_REST_API_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        throw new Error('Falha ao comunicar com Upstash KV.');
      }

      return res.status(200).json({ success: true, message: 'Menu publicado com sucesso!' });
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Método não suportado.' });
}
