export type AuthUser = {
    name: string
    email: string
    password: string
    role: "user" | "admin"
    organization: string
}
