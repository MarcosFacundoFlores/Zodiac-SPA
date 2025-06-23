<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
  >
    <!-- Vista principal con grilla de signos -->
    <div v-if="!selectedSign" class="p-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 pt-8">
          <h1
            class="text-5xl font-bold text-white mb-4 flex items-center justify-center"
          >
            ✨ Horóscopo Diario
          </h1>
          <p class="text-xl text-white/80 mb-8">
            ¿Qué deparan los astros para ti hoy?
          </p>
          <p class="text-lg text-white/60">
            Haz click en tu signo zodiacal para descubrir tu horóscopo
          </p>
        </div>

        <!-- Grilla de signos zodiacales -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="sign in zodiacSigns"
            :key="sign.name"
            @click="selectSign(sign)"
            class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl group"
          >
            <div class="p-6 text-center text-white">
              <div
                class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {{ sign.emoji }}
              </div>
              <h3 class="text-xl font-bold mb-2">{{ sign.name }}</h3>
              <p class="text-sm opacity-80 mb-3">{{ sign.dates }}</p>
              <div
                :class="`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getElementColor(
                  sign.element
                )} text-xs font-semibold`"
              >
                {{ sign.element }}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12">
          <p class="text-white/60 text-sm">
            Descubre lo que el universo tiene preparado para ti
          </p>
        </div>
      </div>
    </div>

    <!-- Vista de horóscopo individual -->
    <div v-else class="flex items-center justify-center p-4 min-h-screen">
      <div class="w-full max-w-2xl">
        <!-- Botón volver -->
        <button
          @click="goBack"
          class="text-white hover:bg-white/10 mb-6 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a los signos
        </button>

        <!-- Card del horóscopo -->
        <div
          class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white"
        >
          <div class="p-8 text-center">
            <!-- Información del signo -->
            <div class="mb-6">
              <div class="text-8xl mb-4 animate-pulse">
                {{ selectedSign.emoji }}
              </div>
              <h1 class="text-4xl font-bold mb-2">{{ selectedSign.name }}</h1>
              <p class="text-lg opacity-80">{{ selectedSign.dates }}</p>
              <div
                :class="`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getElementColor(
                  selectedSign.element
                )} text-white font-semibold mt-4`"
              >
                Elemento: {{ selectedSign.element }}
              </div>
            </div>

            <!-- Estado de carga -->
            <div v-if="loading" class="flex items-center justify-center py-8">
              <svg
                class="w-8 h-8 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>

              <p class="text-xl">Consultando los astros...</p>
            </div>

            <!-- Horóscopo -->
            <div
              v-else-if="horoscope"
              class="bg-white/5 rounded-lg p-6 border border-white/10 animate-fade-in"
            >
              <h2
                class="text-2xl font-semibold mb-4 flex items-center justify-center"
              >
                ✨ Tu horóscopo de hoy
              </h2>
              <p class="text-lg leading-relaxed">{{ horoscope }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import translateToSpanish from "./helpers/libretranslate.ts"

// Datos de los signos zodiacales
const zodiacSigns = [
  {
    id: "aries",
    name: "Aries",
    emoji: "♈",
    dates: "21 Mar - 19 Abr",
    element: "Fuego",
  },
  {
    id: "taurus",
    name: "Tauro",
    emoji: "♉",
    dates: "20 Abr - 20 May",
    element: "Tierra",
  },
  {
    id: "gemini",
    name: "Géminis",
    emoji: "♊",
    dates: "21 May - 20 Jun",
    element: "Aire",
  },
  {
    id: "cancer",
    name: "Cáncer",
    emoji: "♋",
    dates: "21 Jun - 22 Jul",
    element: "Agua",
  },
  {
    id: "leo",
    name: "Leo",
    emoji: "♌",
    dates: "23 Jul - 22 Ago",
    element: "Fuego",
  },
  {
    id: "virgo",
    name: "Virgo",
    emoji: "♍",
    dates: "23 Ago - 22 Sep",
    element: "Tierra",
  },
  {
    id: "libra",
    name: "Libra",
    emoji: "♎",
    dates: "23 Sep - 22 Oct",
    element: "Aire",
  },
  {
    id: "scorpio",
    name: "Escorpio",
    emoji: "♏",
    dates: "23 Oct - 21 Nov",
    element: "Agua",
  },
  {
    id: "sagittarius",
    name: "Sagitario",
    emoji: "♐",
    dates: "22 Nov - 21 Dic",
    element: "Fuego",
  },
  {
    id: "capricorn",
    name: "Capricornio",
    emoji: "♑",
    dates: "22 Dic - 19 Ene",
    element: "Tierra",
  },
  {
    id: "aquarius",
    name: "Acuario",
    emoji: "♒",
    dates: "20 Ene - 18 Feb",
    element: "Aire",
  },
  {
    id: "pisces",
    name: "Piscis",
    emoji: "♓",
    dates: "19 Feb - 20 Mar",
    element: "Agua",
  },
];

// Estado reactivo
const selectedSign = ref(null);
const horoscope = ref("");
const loading = ref(false);

// Métodos
const selectSign = async (sign) => {
  selectedSign.value = sign;
  loading.value = true;
  horoscope.value = "";

  const result = await getHoroscope(selectedSign.value.id);
  const translated = await translateToSpanish(
    result?.data?.horoscope_data || ""
  );
  horoscope.value = translated;

  loading.value = false;
};

const getHoroscope = async (sign) => {
  try {
    const res = await fetch(
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`,
      {
        method: "GET",
      }
    );
    if (!res.ok) throw new Error("Error fetching horoscope");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    alert("No se pudo obtener el horóscopo");
  }
};

const goBack = () => {
  selectedSign.value = null;
  horoscope.value = "";
  loading.value = false;
};

const getElementColor = (element) => {
  const colors = {
    Fuego: "from-red-500 to-orange-500",
    Tierra: "from-green-500 to-emerald-500",
    Aire: "from-blue-500 to-cyan-500",
    Agua: "from-purple-500 to-indigo-500",
  };
  return colors[element] || "from-gray-500 to-slate-500";
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Efectos adicionales para mejorar la experiencia */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Hover effects personalizados */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Animación de pulso personalizada */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
