import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const menu = await kv.get('pizzaria_menu');
      return response.status(200).json(menu || []);
    }

    if (request.method === 'POST') {
      const novoMenu = request.body;
      await kv.set('pizzaria_menu', novoMenu);
      return response.status(200).json({ message: 'Menu guardado!' });
    }
  } catch (error) {
    return response.status(500).json({ error: 'Erro na BD: ' + error.message });
  }
}
