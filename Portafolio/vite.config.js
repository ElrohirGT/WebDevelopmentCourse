import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    Unfonts({
      google: {
        families: ["Kanit", "Asap", "Cambay"],
      },
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
      slides: "/src/slides",
      fonts: "/src/fonts",
    },
  },
});
