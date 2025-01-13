import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title:       "Perlica",
  description: "Result and Option implemented like in Rust",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text:  "Introduction",
        items: [
          { text: "Get Started", link: "/introduction/getstarted" },
        ],
      },
      {
        text:  "API Documentation",
        items: [
          { text: "Result", link: "/api/result" },
          { text: "Option", link: "/api/option" },
          { text: "Predicate", link: "/api/predicate" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/perlicajs/perlica" },
    ],
  },
});
