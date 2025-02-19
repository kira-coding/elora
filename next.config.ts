import type { NextConfig } from "next";

const nextConfig: NextConfig = {
serverExternalPackages: ["@grammy"],
typescript:{
    ignoreBuildErrors: true,
}
};

export default nextConfig;
