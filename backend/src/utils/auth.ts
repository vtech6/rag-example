import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { dialect } from "../features/db/db"

export const auth = betterAuth({
    database: {
        dialect,
        type: "postgres",
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 3,
    },
    plugins: [admin({})],
    trustedOrigins: [
        `http://127.0.0.1:${process.env.BETTER_AUTH_PORT}`,
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        `http://localhost:${process.env.BETTER_AUTH_PORT}`,
    ],
})
