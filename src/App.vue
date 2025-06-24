<template>
  <!-- Background layer -->
  <div
    class="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
  ></div>

  <!-- App container -->
  <div class="min-h-screen overflow-x-hidden flex justify-center">
    <!-- Inner content wrapper -->
    <div class="w-full max-w-6xl px-4">
      <div v-if="!selectedSign">
        <HeaderSection />
        <ZodiacGrid
          :zodiacSigns="zodiacSigns"
          :getElementColor="getElementColor"
          @select="selectSign"
        />
        <FooterSection />
      </div>

      <div v-else class="flex items-center justify-center min-h-screen">
        <HoroscopeCard
          :selectedSign="selectedSign"
          :horoscope="horoscope"
          :loading="loading"
          :getElementColor="getElementColor"
          @back="goBack"
        />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
//import HeaderSection from "./components/HeaderSection.vue";
//import FooterSection from "./components/FooterSection.vue";
import ZodiacGrid from "./components/zodiacGrid.vue";
import HoroscopeCard from "./components/horoscopeCard.vue";
import { useHoroscope } from "./composables/useZodiac.ts";

const {
  zodiacSigns,
  selectedSign,
  horoscope,
  loading,
  selectSign,
  goBack,
  getElementColor,
} = useHoroscope();
</script>
