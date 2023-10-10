import sqlite3 from "sqlite3";
let sql;
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        return console.error(err.message);
});
//create table
sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, )`;
db.run(sql);
//# sourceMappingURL=index.js.map