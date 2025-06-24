<template>
  <div class="w-full max-w-2xl">
    <button
      @click="$emit('back')"
      class="text-black hover:bg-white/10 mb-6 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
      aria-label="Volver a los signos"
    >
      <svg
        class="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
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

    <div
      class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white"
      role="region"
      aria-live="polite"
    >
      <div class="p-8 text-center">
        <!-- Info signo -->
        <div class="mb-6">
          <div
            class="text-8xl mb-4 animate-pulse"
            aria-label="Emoji del signo zodiacal"
          >
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

        <!-- Cargando -->
        <div
          v-if="loading"
          class="flex items-center justify-center py-8"
          role="status"
        >
          <svg
            class="w-8 h-8 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p class="text-xl ml-3">Consultando los astros...</p>
        </div>

        <!-- Horóscopo -->
        <div
          v-else-if="horoscope"
          class="bg-white/5 rounded-lg p-6 border border-white/10 animate-fade-in"
          tabindex="0"
        >
          <h2
            class="text-2xl font-semibold mb-4 flex items-center justify-center"
          >
            ✨ Tu horóscopo de hoy ✨
          </h2>
          <p class="text-lg leading-relaxed whitespace-pre-line">
            {{ horoscope }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZodiacSign } from "../data/zodiacSigns";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _props = defineProps<{
  selectedSign: ZodiacSign;
  horoscope: string;
  loading: boolean;
  getElementColor: (element: string) => string;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _emit = defineEmits<{
  (e: "back"): void;
}>();
</script>
