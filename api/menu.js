
export default async function handler(req, res) {
  // Utilização das variáveis de ambiente padrão do Vercel KV
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  const KV_KEY = 'menu_pizzaria'; 

  // Headers de CORS para permitir a comunicação com o frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificação de integridade das credenciais
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    console.error("CRITICAL ERROR: KV_REST_API_URL ou KV_REST_API_TOKEN não configuradas no Vercel.");
    return res.status(500).json({ error: 'Erro de infraestrutura: Credenciais de sincronização ausentes.' });
  }

  try {
    // MÉTODO GET: Recuperar o Menu
    if (req.method === 'GET') {
      const kvRes = await fetch(`${KV_REST_API_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
      });
      
      if (!kvRes.ok) throw new Error('Falha na comunicação com o banco de dados KV.');

      const kvData = await kvRes.json();
      let menu = null;
      if (kvData.result) {
        menu = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
      }
      return res.status(200).json({ menu });
    }

    // MÉTODO POST: Sincronizar o Menu
    if (req.method === 'POST') {
      const menuData = req.body;
      if (!menuData) return res.status(400).json({ error: 'Corpo da requisição inválido.' });

      const response = await fetch(`${KV_REST_API_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro de Sincronização KV: ${errorText}`);
      }

      return res.status(200).json({ success: true, message: 'Menu sincronizado com sucesso.' });
    }
  } catch (error) {
    console.error("API Menu Error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Método não suportado.' });
}
