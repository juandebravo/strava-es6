const _ = require('lodash');

const client = require('./client');
const models = require('./models');

// Returns an Athlete based on the access token
// or the athlete id
let athlete = (access_token, athlete=null) => {
    let p = client.athlete(access_token, athlete)
    .then((data) => {
        const id = data.id;
        delete data.id;
        return new models.Athlete(id, data);
    });

    return p;
}

// Returns an Array of Activities
// TODO: handle the rest of parameters
let activities = (access_token, interval, page, per_page) => {
    let p = client.activities(access_token)
    .then((data) => {
      let _activities = _.reduce(data, function (result, act) {
        const id = act.id
        delete act.id;

        // Create and push a new Activity to the result
        result.push(new models.Activity(id, act));
        return result
      }, []);
      return _activities;
    })

    return p;
}

exports.athlete = athlete;
exports.activities = activities;
exports.AthleteType = models.AthleteType;
exports.Sex = models.Sex;
exports.MeasurementPreference = models.MeasurementPreference;

exports.version = require('../package.json').version;
