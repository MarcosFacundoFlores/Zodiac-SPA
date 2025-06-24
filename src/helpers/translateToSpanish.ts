export default async function translateToSpanish(text: string): Promise<string> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    return data.translated;
  } catch (err) {
    console.error('Error al traducir:', err);
    return text;
  }
}

