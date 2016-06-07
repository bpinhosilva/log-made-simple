/**
* Created by Bruno Sampaio Pinho da Silva
* On May 31st, 2016
*/

"use strict";

const version = process.versions.node.split(".")[0];;
var LogMadeSimple;

if (version < 6) {
  LogMadeSimple = require('./lib/older.js');
}
else {
  LogMadeSimple = require('./lib/v6.js');
}

module.exports = new LogMadeSimple();