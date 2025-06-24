import fetch from 'node-fetch'; // 👈 THIS is critical
const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY; // 🔁 use process.env directly




export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Texto inválido' });
  }

try {
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
    },
    body: new URLSearchParams({
      text,
      target_lang: 'ES',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ error: 'Error en la API de DeepL', details: error });
  }

  const data = await response.json();
  const translatedText = data.translations?.[0]?.text || '';

  return res.status(200).json({ translated: translatedText });
} catch (err) {
  console.error('Error al traducir:', err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

}
