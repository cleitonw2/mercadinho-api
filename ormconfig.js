module.exports = {
    type: "sqlite",
    database: "src/database/database.sqlite",
    migrations: ["./src/database/migrations/**.ts"],
    entities: ["./src/modules/**/entities/**.ts"],
    cli: {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "./src/modules/**/entities/**.ts"
    }
}