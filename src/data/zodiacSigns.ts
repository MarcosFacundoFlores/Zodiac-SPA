export interface ZodiacSign {
  id: string;
  name: string;
  emoji: string;
  dates: string;
  element: string;
}

export const zodiacSigns: ZodiacSign[] = [
  { id: "aries", name: "Aries", emoji: "♈", dates: "21 Mar - 19 Abr", element: "Fuego" },
  { id: "taurus", name: "Tauro", emoji: "♉", dates: "20 Abr - 20 May", element: "Tierra" },
  { id: "gemini", name: "Géminis", emoji: "♊", dates: "21 May - 20 Jun", element: "Aire" },
  { id: "cancer", name: "Cáncer", emoji: "♋", dates: "21 Jun - 22 Jul", element: "Agua" },
  { id: "leo", name: "Leo", emoji: "♌", dates: "23 Jul - 22 Ago", element: "Fuego" },
  { id: "virgo", name: "Virgo", emoji: "♍", dates: "23 Ago - 22 Sep", element: "Tierra" },
  { id: "libra", name: "Libra", emoji: "♎", dates: "23 Sep - 22 Oct", element: "Aire" },
  { id: "scorpio", name: "Escorpio", emoji: "♏", dates: "23 Oct - 21 Nov", element: "Agua" },
  { id: "sagittarius", name: "Sagitario", emoji: "♐", dates: "22 Nov - 21 Dic", element: "Fuego" },
  { id: "capricorn", name: "Capricornio", emoji: "♑", dates: "22 Dic - 19 Ene", element: "Tierra" },
  { id: "aquarius", name: "Acuario", emoji: "♒", dates: "20 Ene - 18 Feb", element: "Aire" },
  { id: "pisces", name: "Piscis", emoji: "♓", dates: "19 Feb - 20 Mar", element: "Agua" },
];
