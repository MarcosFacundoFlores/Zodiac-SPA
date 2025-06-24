
import fetch from 'node-fetch'; // 👈 Use this instead of global fetch

export default async function handler(req, res) {
  const { sign } = req.query;

  if (!sign || typeof sign !== 'string') {
    return res.status(400).json({ error: 'Signo inválido' });
  }

  try {
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`);

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'API error', details: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    res.status(500).json({ error: 'Error al obtener horóscopo' });
  }
}
