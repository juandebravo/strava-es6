
let _activity = require('./models/activity');

for (let o of Object.keys(_activity)) {
    exports[o] = _activity[o];
}

let _athlete = require('./models/athlete');

for (let o of Object.keys(_athlete)) {
    exports[o] = _athlete[o];
}
