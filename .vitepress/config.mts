import { defineConfig } from "vitepress";

const sidebars = {
  gettingStarted: {
    text: "Getting Started",
    collapsed: true,
    items: [
      { text: "Runtime API Examples", link: "/api-examples" },
      {
        text: "Cloudflare Workers",
        link: "/getting-started/cloudflare-workers",
      },
    ],
  },
  middleware: {
    text: "Middleware",
    collapsed: true,
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      {
        text: "Bearer Authentication",
        link: "/middleware/builtin/bearer-auth",
      },
      { text: "Cache", link: "/middleware/builtin/cache" },
    ],
  },
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Indid Docs",
  description: "Account Abstraction Infrastructure",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: {
      "/": [sidebars["gettingStarted"], sidebars["middleware"]],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/knobs-dev/indid-documentation",
      },
    ],
    search: {
      provider: "local",
    },
  },
});
