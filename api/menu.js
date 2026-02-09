
export default async function handler(req, res) {
  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
  const KV_KEY = 'UPSTASH_API_FENICIA'; 

  // Configuração de CORS para permitir requisições do próprio domínio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    console.error('ERRO: Credenciais do Upstash não configuradas no Vercel.');
    return res.status(500).json({ error: 'Erro de configuração no servidor. Verifique as variáveis de ambiente.' });
  }

  try {
    if (req.method === 'GET') {
      const kvResponse = await fetch(`${UPSTASH_REDIS_REST_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
        cache: 'no-store'
      });
      
      if (!kvResponse.ok) {
        throw new Error(`Upstash respondeu com status: ${kvResponse.status}`);
      }

      const data = await kvResponse.json();
      let menu = null;
      if (data.result) {
        menu = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
      return res.status(200).json({ menu });
    }

    if (req.method === 'POST') {
      const menuData = req.body;
      const response = await fetch(`${UPSTASH_REDIS_REST_URL}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        throw new Error(`Falha ao salvar no Upstash: ${response.statusText}`);
      }
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Erro na execução da função api/menu:', error.message);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
