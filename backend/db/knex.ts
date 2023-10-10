import knex from "knex";

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "contacts.db",
  },
  useNullAsDefault: true,
});

export default connectedKnex