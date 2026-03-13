import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin", "color-functions", "if-function"],
  },
};

export default config;
