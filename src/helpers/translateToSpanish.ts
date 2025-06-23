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
