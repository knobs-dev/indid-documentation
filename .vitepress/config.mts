import { defineConfig } from "vitepress";

const sidebars = {
  introduction: {
    text: "Introduction",
    collapsed: true,
    items: [
      {
        text: "Overview",
        link: "/introduction/overview",
      },
      {
        text: "Supported Networks",
        link: "/introduction/supported-networks",
      },
      {
        text: "Quickstart Guides",
        link: "/introduction/quickstart",
      },
    ],
  },
  pricing: {
    text: "Pricing",
    collapsed: true,
    items: [
      {
        text: "Pricing",
        link: "/pricing/pricing",
      },
      {
        text: "Pricing FAQ",
        link: "/pricing/faq",
      },
    ],
  },
  api: {
    text: "API Reference",
    collapsed: true,
    items: [
      {
        text: "Endpoints Details",
        link: "/api/endpointsDetailsIntro",
      },
      {
        text: "Rate Limiting",
        link: "/api/rateLimiting",
      },
      {
        text: "Api key",
        collapsed: true,
        items: [
          { text: "API Key Best Practices", link: "/api/apiKeyBestPractices" },
          { text: "API Key Revocation", link: "/api/revokeApiKey" },
        ],
      },
      {
        text: "Endpoints",
        collapsed: true,
        items: [
          { text: "Retrieve SDK Defaults", link: "/api/getSDKDefaults" },
          { text: "Create Account", link: "/api/createAccount" },
          { text: "Get InitCode", link: "/api/getInitCode" },
          { text: "Send UserOp", link: "/api/sendUserOp" },
          { text: "Get UserOp status", link: "/api/getOpStatus" },
          {
            text: "Sign UserOp for Paymaster Sponsorship",
            link: "/api/signPaymasterOp",
          },
          { text: "Get Account Info", link: "/api/getAccountInfo" },
          { text: "Recover account", link: "/api/recoverAccount" },
          { text: "Notarize", link: "/api/notarize" },
          { text: "Get Notarizations", link: "/api/notarizations" },
          {
            text: "Proof of Inclusion",
            link: "/api/notarizationsProofOfInclusion",
          },
          { text: "Get Task Status", link: "/api/taskStatus" },
          { text: "Get Task by UserOp Hash", link: "/api/taskByUserOp" },
          { text: "Send Delegated Tx", link: "/api/sendDelegatedTx" },
        ],
      },
    ],
  },
  sdk: {
    text: "SDK Reference",
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
        // TODO: Is still working? If not, remove it
        /* {
        text: "Social Login",
        link: "/sdk/web3Auth",
      }, */
      },
    ],
  },
  howToGuides: {
    text: "Guides",
    collapsed: true,
    items: [
      {
        text: "Build a Gasless Onboarding Flow",
        link: "/how-to-guides/gasless-onboarding",
      },
      {
        text: "Implement Document Notarization in a dApp",
        link: "/how-to-guides/document-notarization",
      },
      {
        text: "Configure Guardians for Smart Wallet Social Recovery",
        link: "/how-to-guides/guardian-social-recovery",
      },
      {
        text: "Handle System Notifications with Webhooks",
        link: "/how-to-guides/webhooks-notifications",
      },
      {
        text: "Monitor Task Status in Real Time with WebSockets",
        link: "/how-to-guides/realtime-task-status-websockets",
      },
    ],
  },
  resources: {
    text: "Resources",
    collapsed: true,
    items: [
      {
        text: "Glossary",
        link: "/resources/glossary",
      },
      {
        text: "Indid Smart Contracts (verified & audited)",
        link: "/resources/smart-contracts",
      },
      {
        text: "Audits",
        link: "/resources/audits",
      },
      {
        text: "Paymasters",
        link: "/resources/paymasters",
      },
    ],
  },
  support: {
    text: "Support",
    collapsed: true,
    items: [
      {
        text: "Contact us",
        link: "/support/contact-us",
      },
      // TODO: Work in progress
      /* {   {
        text: "Community",
        link: "/support/community",
      },
      {
        text: "Troubleshooting",
        link: "/support/troubleshooting",
      },*/
    ],
  },
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Indid Docs",
  description: "Account Abstraction Infrastructure",
  ignoreDeadLinks: true,
  themeConfig: {
    sidebar: {
      "/": [
        sidebars["introduction"],
        sidebars["pricing"],
        sidebars["api"],
        sidebars["sdk"],
        // TODO: Work in progress
        //sidebars["howToGuides"],
        //sidebars["resources"],
        sidebars["support"],
      ],
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
