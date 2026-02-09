
export default async function handler(req, res) {
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  const KV_KEY = 'UPSTASH_API_FENICIA'; 

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return res.status(500).json({ error: 'Erro de infraestrutura: Credenciais KV ausentes.' });
  }

  try {
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

    if (req.method === 'POST') {
      const menuData = req.body;
      const response = await fetch(`${KV_REST_API_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) throw new Error('Falha ao comunicar com Upstash KV.');
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Método não suportado.' });
}
