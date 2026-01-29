
export default async function handler(req, res) {
  // Novas variáveis solicitadas pelo utilizador
  const { UPSTASH_API_FENICIA_REST_API_URL, UPSTASH_API_FENICIA_REST_API_TOKEN } = process.env;
  const KV_KEY = 'menu_pizzaria'; // Chave solicitada

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação das credenciais
  if (!UPSTASH_API_FENICIA_REST_API_URL || !UPSTASH_API_FENICIA_REST_API_TOKEN) {
    console.error("ERRO: Variáveis UPSTASH_API_FENICIA não configuradas.");
    return res.status(500).json({ error: 'Configuração Upstash ausente no Vercel.' });
  }

  try {
    if (req.method === 'GET') {
      const kvRes = await fetch(`${UPSTASH_API_FENICIA_REST_API_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${UPSTASH_API_FENICIA_REST_API_TOKEN}` }
      });
      
      const kvData = await kvRes.json();
      let menu = null;
      if (kvData.result) {
        menu = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
      }
      return res.status(200).json({ menu });
    }

    if (req.method === 'POST') {
      const menuData = req.body;
      
      // Envio para Upstash KV
      const response = await fetch(`${UPSTASH_API_FENICIA_REST_API_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${UPSTASH_API_FENICIA_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(menuData))
      });

      if (!response.ok) {
        throw new Error('Falha ao gravar no Upstash');
      }

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
