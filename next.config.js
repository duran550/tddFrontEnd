//const {BACKEND_URL} = require("./types/backendUrl");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '127.0.0.1', 'test-backend.tdd-tool.eu'],
  },
  serverRuntimeConfig:{
    secret: process.env.NEXTAUTH_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  env:{
    BACKEND_URL: process.env.BACKEND_URL,
    secret: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  }
};

module.exports = nextConfig;
