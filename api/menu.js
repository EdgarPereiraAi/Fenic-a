
export default async function handler(req, res) {
  // Variáveis padrão do Vercel KV (Upstash)
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  const KV_KEY = 'menu_pizzaria'; 

  // Configuração de CORS para permitir chamadas do frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificação de segurança das credenciais
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    console.error("ERRO: Variáveis KV_REST_API_URL ou KV_REST_API_TOKEN não encontradas no Vercel.");
    return res.status(500).json({ error: 'Erro de configuração no servidor (Variáveis KV ausentes).' });
  }

  try {
    // MÉTODO GET: Recuperar o Menu para os Clientes
    if (req.method === 'GET') {
      const kvRes = await fetch(`${KV_REST_API_URL}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
      });
      
      if (!kvRes.ok) throw new Error('Falha ao comunicar com o Upstash KV');

      const kvData = await kvRes.json();
      let menu = null;
      
      if (kvData.result) {
        // O Upstash pode retornar como objeto ou string JSON. Tratamos ambos.
        menu = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
      }
      return res.status(200).json({ menu });
    }

    // MÉTODO POST: Gravar o Menu (Chamado pelo botão do Administrador)
    if (req.method === 'POST') {
      const menuData = req.body;
      
      if (!menuData) {
        return res.status(400).json({ error: 'Corpo da requisição vazio.' });
      }

      // Gravamos os dados no KV. 
      // Usamos JSON.stringify para garantir que o objeto seja salvo como uma string estruturada.
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
        throw new Error(`Upstash Error: ${errorText}`);
      }

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Erro na API de Menu:", error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
