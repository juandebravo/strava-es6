/*jshint esnext: true */

const fs = require('fs');
const path = require('path');

// Export directly every export in the models files
const modelsFolder = path.join(__dirname, 'models');
fs.readdirSync(modelsFolder).forEach((model) => {
  let _file = require(`./models/${model}`);

  for (let o of Object.keys(_file)) {
    exports[o] = _file[o];
  }
});
