import { PGVectorStore } from "@langchain/community/vectorstores/pgvector"
import { OpenAIEmbeddings } from "@langchain/openai"
import {
    Kysely,
    PostgresAdapter,
    PostgresIntrospector,
    PostgresQueryCompiler,
} from "kysely"
import { KyselySequelizeDialect } from "kysely-sequelize"
import { Sequelize } from "sequelize-typescript"
import { PostgresRecordManager } from "@langchain/community/indexes/postgres"
interface Database {}

const dotenv = process.env
const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = dotenv

const sequelize = new Sequelize(
    POSTGRES_DB ?? "",
    POSTGRES_USER ?? "",
    POSTGRES_PASSWORD ?? "",
    {
        host: POSTGRES_HOST ?? "",
        port: parseInt(POSTGRES_PORT ?? "1"),
        dialect: "postgres",
    }
)

sequelize.authenticate({
    retry: {
        backoffBase: 1_000,
        backoffExponent: 1,
        max: (5 * 60 * 1_000) / 5,
        timeout: 5 * 60 * 1_000,
    },
})
const postgresConnectionOptions = {
    host: "172.22.0.1",
    port: 5433,
    user: "admin",
    password: "admin",
    database: "mwrag",
}
const postgresOptions = {
    postgresConnectionOptions,
    tableName: "documents",
}

const embeddingModel = new OpenAIEmbeddings()
export const getVectorStore = () =>
    PGVectorStore.initialize(embeddingModel, {
        ...postgresOptions,
        tableName: "vector_store",
    })

export const getVectorManager = () =>
    new PostgresRecordManager("record_manager", postgresOptions)
getVectorManager().createSchema()
sequelize.query("CREATE EXTENSION IF NOT EXISTS vector")

let kysely: Kysely<Database>
let dialect: KyselySequelizeDialect

dialect = new KyselySequelizeDialect({
    kyselySubDialect: {
        createAdapter: () => new PostgresAdapter(),
        createIntrospector: (db) => new PostgresIntrospector(db),
        createQueryCompiler: () => new PostgresQueryCompiler(),
    },
    sequelize,
})

kysely = new Kysely<Database>({
    dialect,
})

export { kysely, sequelize, dialect }
