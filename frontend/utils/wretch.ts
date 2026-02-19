import wretch from "wretch"

const BackendHost = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = wretch(`${BackendHost}/api/v1`, {
    mode: "cors",
    content: "application/json",
})
