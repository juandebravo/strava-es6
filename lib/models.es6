/*jshint esnext: true */

// Export directly every export in the following
// models files

// TODO: load automatically every file in models folder
const _models = ['activity', 'athlete', 'stravamap'];

for (let model of _models) {
  let _file = require(`./models/${model}`);

  for (let o of Object.keys(_file)) {
    exports[o] = _file[o];
  }
}
