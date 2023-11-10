/** @type {import('next').NextConfig} */
const nextConfig = {
    deploy: {
        environment:"dev"
    },
    dev: {
        databaseUrl: "mongodb://admin:pass@localhost:8081/",
        databaseName: "KrispyKream"
    }
}

module.exports = nextConfig
