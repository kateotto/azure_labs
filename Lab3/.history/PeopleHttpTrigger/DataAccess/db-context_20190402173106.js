const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        this.log("getPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        console.log("1");
        const request = new sql.Request(connection);
        console.log("2");
        const result = await request.query('select * from People');
        console.log("3");
        this.log("getPeople function - done")
        return result.recordset;
    }
}

module.exports = PeopleDbContext;