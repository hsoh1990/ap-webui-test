/**
 * Shows how to use chaining rather than the `serialize` method.
 */
"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
    console.log("createDb ap ui db");
    db = new sqlite3.Database('ap.ui.db', createTable);
}


function createTable() {
    db.run("CREATE TABLE IF NOT EXISTS user (uid TEXT UNIQUE, password TEXT)", insertRows);
}

function insertRows() {
    var stmt = db.prepare("INSERT INTO user(uid, password) VALUES (?, ?)");
    stmt.run('admin', 'admin', err => {
        console.log(err)
    });
    stmt.finalize(closeDb());
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runWebUiInitDb() {
    createDb();
}

module.exports = { runWebUiInitDb };