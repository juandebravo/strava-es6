const client = require('./client');

exports.version = require('../package.json').version;
exports.foo = client.foo;
exports.athlete = client.athlete;
