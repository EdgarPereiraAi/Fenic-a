
import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  // Verifica se o token do Blob existe
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is missing');
    return response.status(500).json({ error: 'Configuração do Vercel Blob em falta.' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Lógica de autorização simplificada
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          tokenPayload: JSON.stringify({
            restaurantId: 'fenicia-tavira',
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Upload handler error:', error);
    return response.status(400).json({ error: error.message });
  }
}
