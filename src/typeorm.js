module.exports = {
    "name":"default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "typeormtest",
    "password": "password",
    "database": "typeormtest",
    "synchronize": true,
    "logging": false,
    "entities": [`${__dirname}/src/modules/models/*.ts`]
}