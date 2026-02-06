
export default async function handler(req, res) {
  // Revertendo para as variáveis personalizadas conforme o estado anterior
  const { KV_URL_FENICIA, KV_TOKEN_FENICIA } = process.env;
  const KV_KEY = 'pizzaria_menu_fenicia'; 

  // Headers de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificação de integridade
  if (!KV_URL_FENICIA || !KV_TOKEN_FENICIA) {
    console.error("CRITICAL ERROR: KV_URL_FENICIA ou KV_TOKEN_FENICIA não configuradas.");
    return res.status(500).json({ error: 'Erro de infraestrutura: Credenciais de sincronização ausentes.' });
  }

  try {
    if (req.method === 'GET') {
      const kvRes = await fetch(`${KV_URL_FENICIA}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN_FENICIA}` }
      });
      
      if (!kvRes.ok) throw new Error('Falha na comunicação com o banco de dados KV.');

      const kvData = await kvRes.json();
      let menu = null;
      if (kvData.result) {
        menu = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
      }
      return res.status(200).json({ menu });
    }

    if (req.method === 'POST') {
      const menuData = req.body;
      if (!menuData) return res.status(400).json({ error: 'Corpo da requisição inválido.' });

      const response = await fetch(`${KV_URL_FENICIA}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${KV_TOKEN_FENICIA}`,
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
