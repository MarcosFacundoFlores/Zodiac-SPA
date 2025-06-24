// Traducción simple de tu llamada original
export default async function handler(req: any, res: any) {
  const { sign } = req.query;

  try {
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener horóscopo' });
  }
}
