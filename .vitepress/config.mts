import { defineConfig } from "vitepress";

const sidebars = {
  gettingStarted: {
    text: "Getting Started",
    collapsed: true,
    items: [
      {
        text: "Getting Started",
        link: "/getting-started/gettingStarted",
      },
      {
        text: "Details of Indid API",
        link: "/getting-started/indidAPIDetails",
      },
    ],
  },
  api: {
    text: "API",
    collapsed: true,
    items: [
      {
        text: "Endpoints Details",
        link: "/api/endpointsDetailsIntro",
      },
      {
        text: "Retrieve SDK Defaults",
        link: "/api/getSDKDefaults",
      },
      {
        text: "Create Account",
        link: "/api/createAccount",
      },
      {
        text: "Get InitCode",
        link: "/api/getInitCode",
      },
      {
        text: "Send UserOp",
        link: "/api/sendUserOp",
      },
      {
        text: "Get UserOp status",
        link: "/api/getOpStatus",
      },
      {
        text: "Sign UserOp for Paymaster Sponsorship",
        link: "/api/signPaymasterOp",
      },
      {
        text: "Recover account",
        link: "/api/recoverAccount",
      },
    ],
  },
  sdk: {
    text: "SDK",
    collapsed: true,
    items: [
      {
        text: "Getting Started",
        link: "/sdk/gettingStarted",
      },
      {
        text: "Changes",
        link: "/sdk/changes",
      },
      {
        text: "Builder",
        link: "/sdk/builder",
      },
      {
        text: "Core SDK",
        link: "/sdk/coreSdk",
      },
      {
        text: "Admin SDK",
        link: "/sdk/adminSdk",
      },
      {
        text: "Ethers Adapters",
        link: "/sdk/ethersAdapters",
      },
      {
        text: "Social Login",
        link: "/sdk/web3Auth",
      },
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
      // { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: {
      "/": [sidebars["gettingStarted"], sidebars["api"], sidebars["sdk"]],
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
