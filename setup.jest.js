globalThis.IS_REACT_ACT_ENVIRONMENT = true; // https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ["images.example.com"],
    path: "/_next/image",
    loader: "default",
  },
};
