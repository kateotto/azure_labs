const PeopleDbContext = require('./DataAccess/db-context');
const common = require('./../common');


module.exports = async function (context, req) {
    await common.functionWrapper(context, req, async (body) => {
        const connectionString = process.env['PeopleDb'];
        const peopleDb = new PeopleDbContext(connectionString, context.log);
        body.people = await peopleDb.getPeople();

        if (req.method == 'GET') {
            const id = req.query['id'];
            if (id) {
                body.people = await peopleDb.getPersonById(id);
                return;
            }
            body.people = await peopleDb.getPeople();
            return;
        }

        if (req.method == 'DELETE') {
            const id = req.query['id'];
            if (id) {
                body.people = await peopleDb.removePerson(id);
                return;
            }
        }

        if (req.method == 'PUT') {
            const id = req.query['id'];
            const { firstname, lastname, phonenumber } = req.body.person;
            if (id) {
                body.people = await peopleDb.updatePerson(firstname, lastname, phonenumber);
                return;
            }
        }

        if (req.method == 'POST') {
            const { firstname, lastname, phonenumber } = req.body.person;
            await peopleDb.addPerson(firstname, lastname, phonenumber);
            return;
        }
    });
};