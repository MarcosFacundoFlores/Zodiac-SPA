import { ref } from "vue";
import { zodiacSigns, type ZodiacSign } from "../data/zodiacSigns";
import translateToSpanish from "../helpers/translateToSpanish";

export default function useHoroscope() {
  const selectedSign = ref<ZodiacSign | null>(null);
  const horoscope = ref("");
  const loading = ref(false);

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      Fuego: "from-red-500 to-orange-500",
      Tierra: "from-green-500 to-emerald-500",
      Aire: "from-blue-500 to-cyan-500",
      Agua: "from-purple-500 to-indigo-500",
    };
    return colors[element] || "from-gray-500 to-slate-500";
  };

  const selectSign = async (sign: ZodiacSign) => {
    selectedSign.value = sign;
    loading.value = true;
    horoscope.value = "";

    try {
      const res = await fetch(`/api/horoscope?sign=${sign.id}`);
      if (!res.ok) throw new Error("Error fetching horoscope");
      const data = await res.json();

      const translated = await translateToSpanish(data?.data?.horoscope_data || "");
      horoscope.value = translated;
    } catch (error) {
      console.error(error);
      alert("No se pudo obtener el horóscopo");
    } finally {
      loading.value = false;
    }
  };

  const goBack = () => {
    selectedSign.value = null;
    horoscope.value = "";
    loading.value = false;
  };

  return {
    zodiacSigns,
    selectedSign,
    horoscope,
    loading,
    selectSign,
    goBack,
    getElementColor,
  };
}
