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
        const request = new sql.Request(connection);
        const result = await request.query('select * from People');
        this.log("getPeople function - done")
        return result.recordset;
    }
    async getPersonById(id) {
        this.log("getPersonById function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People where PersonId = $(id)');
        this.log("getPerson function - done")
        return result.recordset;
    }


    async removePerson(id) {
        this.log("removePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('delete people where PersonId = $(id)');
        this.log("removePerson function - done")
        return result.recordset;
    }
    async updatePerson(id) {
        this.log("updatePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('update people set PersonName = ${name} where PersonId = ${id}');
        this.log("updatePerson function - done")
        return result.recordset;
    }
    async addPerson(id) {
        this.log("addPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('insert into People values (${firstname}, ${lastname}, ${phonenumber})');
        this.log("addPerson function - done")
        return result.recordset;
    }
}

module.exports = PeopleDbContext;