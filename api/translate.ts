// Este archivo va en la raíz de tu proyecto (o en /api si estás usando monorepo)

import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
        target_lang: 'ES'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error: 'Error en la API de DeepL', details: error });
    }

    const data = await response.json();
    const translatedText = data.translations[0]?.text || '';

    return res.status(200).json({ translated: translatedText });

  } catch (err) {
    console.error('Error al traducir:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/* 

import * as deepl from 'deepl-node';
import { env } from 'process';
import.meta.env.VITE_DEEPL_API_KEY


export default async function translateToSpanish(text: string): Promise<string> {

  const authKey: string = env.VITE_DEEPL_API_KEY ?? "";
  const translator = new deepl.Translator(authKey);

  try {
    const res = await translator.translateText(text, 'en', 'es');
    return res.text;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text; // fallback si falla
  }
};

*/