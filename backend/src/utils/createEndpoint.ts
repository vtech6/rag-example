import { Express, Request, Response, NextFunction } from "express"

type requestParams = {
    app: Express
    endpoint: string
    resolver: (req: Request, res: Response, next: NextFunction) => void
    method?: string
}

const makeEndpoint = (endpoint: string, version = "") =>
    `/api/${version}${version !== "" ? "/" : ""}${endpoint}`

export const createQuery = ({ app, endpoint, resolver }: requestParams) => {
    app.get(makeEndpoint(endpoint), resolver)
}

export const createMutation = ({
    app,
    endpoint,
    resolver,
    method = "POST",
}: requestParams) => {
    switch (method) {
        case "DELETE":
            app.delete(makeEndpoint(endpoint), resolver)
        case "PUT":
            app.put(makeEndpoint(endpoint), resolver)
        default:
            app.post(makeEndpoint(endpoint), resolver)
    }
}
