
export default async function handler(req, res) {
  // O Vercel injeta automaticamente estas variáveis se o KV estiver conectado
  const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const KV_KEY = 'PIZZARIA_FENICIA_MENU_V2';

  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!URL || !TOKEN) {
    console.error('CRITICAL ERROR: KV environment variables are missing.');
    return res.status(500).json({ 
      error: 'Servidor não configurado.', 
      details: 'As variáveis KV_REST_API_URL e KV_REST_API_TOKEN não foram encontradas no ambiente.' 
    });
  }

  try {
    // --- LÓGICA DE GET ---
    if (req.method === 'GET') {
      const kvResponse = await fetch(`${URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        cache: 'no-store'
      });
      
      if (!kvResponse.ok) {
        const errText = await kvResponse.text();
        throw new Error(`Upstash/KV Error: ${kvResponse.status} - ${errText}`);
      }

      const data = await kvResponse.json();
      
      // No Upstash/KV, o resultado pode vir como string JSON ou objeto dependendo de como foi salvo
      let menu = null;
      if (data.result) {
        try {
          menu = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        } catch (e) {
          console.error('Error parsing menu data from KV:', e);
          menu = null;
        }
      }
      
      return res.status(200).json({ menu });
    }

    // --- LÓGICA DE POST ---
    if (req.method === 'POST') {
      const menuData = req.body;
      
      if (!menuData) {
        return res.status(400).json({ error: 'Corpo da requisição vazio.' });
      }

      // Vercel KV espera o valor como string ou JSON dependendo do comando
      // Usamos o endpoint de POST para o comando SET
      const response = await fetch(`${URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to save to KV: ${response.status} - ${errText}`);
      }

      return res.status(200).json({ success: true, timestamp: Date.now() });
    }

    // Método não suportado
    return res.status(405).json({ error: `Método ${req.method} não permitido.` });

  } catch (error) {
    console.error(`API ROUTE ERROR [${req.method}]:`, error.message);
    return res.status(500).json({ 
      error: 'Erro interno no servidor de API.', 
      details: error.message 
    });
  }
}
