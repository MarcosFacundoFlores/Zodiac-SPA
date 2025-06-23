const translateToSpanish = async (text: string): Promise<string> => {
  try {
    const res = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "DeepL-Auth-Key TU_API_KEY_ACÁ"
      },
      body: new URLSearchParams({
        text,
        target_lang: "ES"
      })
    });

    const data = await res.json();
    return data.translations[0].text;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text; // fallback si falla
  }
};
