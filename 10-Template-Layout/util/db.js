/**
 * Config module Lowdb
 */
const lowDB = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('db.json');
const db = lowDB(adapter);

module.exports = db;