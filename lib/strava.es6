const client = require('./client');
const models = require('./models');

exports.version = require('../package.json').version;

let athlete = (access_token, athlete=null) => {
    let p = client.athlete(access_token, athlete)
    .then((data) => {
        const id = data.id;
        delete data.id;
        return new models.Athlete(id, data);
    });

    return p;
}

let activities = (access_token, interval, page, per_page) => {
    let p = client.activities(access_token)
    .then((data) => {
      let _activities = new Array();
      for (let act of data) {
        const id = act.id
        delete act.id;
        _activities.push(new models.Activity(id, act));
      }
      return _activities;
    })

    return p;
}

exports.athlete = athlete;
exports.activities = activities;
exports.AthleteType = models.AthleteType;
exports.Sex = models.Sex;
exports.MeasurementPreference = models.MeasurementPreference;
