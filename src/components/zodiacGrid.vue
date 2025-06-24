<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" role="list">
    <div
      v-for="sign in zodiacSigns"
      :key="sign.id"
      @click="$emit('select', sign)"
      class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl group"
      role="listitem"
      tabindex="0"
      @keydown.enter.prevent="$emit('select', sign)"
      @keydown.space.prevent="$emit('select', sign)"
      :aria-label="`Seleccionar signo zodiacal ${sign.name}`"
    >
      <div class="p-6 text-center text-white">
        <div
          class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
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
</template>

<script setup lang="ts">
import type { ZodiacSign } from "../data/zodiacSigns";

defineProps<{
  zodiacSigns: ZodiacSign[];
  getElementColor: (element: string) => string;
}>();

defineEmits<{
  (e: "select", sign: ZodiacSign): void;
}>();
</script>
