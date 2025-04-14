// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// // Import static translation JSON files
// import enTranslation from "../translations/english.json";
// import frTranslation from "../translations/french.json";
// import swTranslation from "../translations/kiswahili.json";

// // Function to dynamically fetch translations from LibreTranslate API
// const fetchDynamicTranslation = async (key, lng) => {
//   const res = await fetch("https://libretranslate.com/translate", {
//     method: "POST",
//     body: JSON.stringify({
//       q: key,
//       source: "en",
//       target: lng,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });

//   const data = await res.json();
//   return data.translatedText;
// };

// i18n
//   .use(initReactI18next) // pass the i18n instance to react-i18next
//   .init({
//     resources: {
//       en: { translation: enTranslation },
//       fr: { translation: frTranslation },
//       sw: { translation: swTranslation },
//     },
//     lng: "en", // default language
//     fallbackLng: "en", // fallback language when the translation is not available
//     interpolation: {
//       escapeValue: false, // react already escapes values
//     },
//     // Adding a missing key handler
//     missingKeyHandler: async (lng, ns, key, fallbackValue) => {
//       // Fetch dynamic translation if the key is missing in the static resources
//       if (!i18n.t(key)) {
//         const dynamicTranslation = await fetchDynamicTranslation(key, lng);
//         // Return dynamic translation
//         return dynamicTranslation;
//       }
//       return fallbackValue;
//     },
//   });

// export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation JSON files
import enTranslation from "../translations/english.json";
import frTranslation from "../translations/french.json";
import swTranslation from "../translations/kiswahili.json";

// Function to fetch translation dynamically
const fetchTranslation = async (source, target, key) => {
  const response = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: key, // The text to be translated
      source: source, // Current language
      target: target, // Target language
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(key)
  const data = await response.json();
  return data.translatedText;
};

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      sw: { translation: swTranslation },
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language when the translation is not available
    interpolation: {
      escapeValue: false, // react already escapes values
    },
    missingKeyHandler: async (lng, key, fallbackValue) => {
      console.log("first")
      // If a translation key is missing, we dynamically fetch it
      const translatedText = await fetchTranslation(i18n.language, lng, key);
      i18n.addResource(lng, "translation", key, translatedText);
    },
  });

export default i18n;
