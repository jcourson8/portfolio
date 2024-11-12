import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false
  },
  // webpack: (config, { dev, isServer }) => {
  //   // Disable webpack caching in development
  //   if (dev) {
  //     config.cache = false
  //   }
  //   return config
  // }
}

export default withPayload(nextConfig)
