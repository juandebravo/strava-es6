// Export directly every export in the following
// models files

// TODO: load automatically every file in models folder
const _models = ['activity', 'athlete'];

for (let m of _models) {
  let _file = require(`./models/${m}`);

  for (let o of Object.keys(_file)) {
    exports[o] = _file[o];
  }
}
