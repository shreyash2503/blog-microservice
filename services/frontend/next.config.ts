import type { NextConfig } from "next";

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains: ["github.com"]

  }
};

export default nextConfig;
