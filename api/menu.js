
export default async function handler(req, res) {
  // Variáveis de ambiente padrão do Vercel KV / Upstash
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  
  // Chave de armazenamento solicitada
  const KV_KEY = 'menu_pizzaria'; 

  // Headers de CORS para segurança e comunicação
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação das credenciais no ambiente Vercel
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    console.error("ERRO: Credenciais KV_REST_API_URL ou KV_REST_API_TOKEN ausentes.");
    return res.status(500).json({ error: 'Configuração de base de dados incompleta no Vercel.' });
  }

  try {
    // MÉTODO GET: Para carregar o menu na App
    if (req.method === 'GET') {
      const kvResponse = await fetch(`${KV_REST_API_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
      });
      
      const data = await kvResponse.json();
      let menu = null;
      if (data.result) {
        menu = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
      return res.status(200).json({ menu });
    }

    // MÉTODO POST: Para atualizar o menu (Sincronização do Administrador)
    if (req.method === 'POST') {
      const menuData = req.body;
      
      if (!menuData) {
        return res.status(400).json({ error: 'Dados do menu inválidos.' });
      }

      // Envio para o Upstash via REST API
      const response = await fetch(`${KV_REST_API_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        throw new Error('Falha ao gravar no Upstash');
      }

      return res.status(200).json({ success: true, message: 'Menu publicado com sucesso!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).end();
}
