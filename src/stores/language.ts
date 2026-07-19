// src/stores/language.ts

import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLanguageStore = defineStore("language", () => {
  const locale = ref(localStorage.getItem("lang") || "en");

  const applyLanguage = () => {
    document.documentElement.lang = locale.value;
    document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";
  };

  const setLanguage = (lang: "ar" | "en") => {
    locale.value = lang;
  };

  const toggleLanguage = () => {
    locale.value = locale.value === "ar" ? "en" : "ar";
  };

  watch(
    locale,
    (value) => {
      localStorage.setItem("lang", value);
      applyLanguage();
    },
    { immediate: true }
  );

  return {
    locale,
    setLanguage,
    toggleLanguage,
  };
});