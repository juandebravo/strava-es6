/*jshint esnext: true */

const _ = require('lodash');

import * as client from './client';
import * as models from './models';

// Returns an Athlete based on the access token
// or the athlete id
export let athlete = (access_token, athlete=null) => {
    let p = client.athlete(access_token, athlete)
    .then((data) => {
        const id = data.id;
        delete data.id;
        return new models.Athlete(id, data);
    });

    return p;
};

// Returns an Array of Activities
// TODO: handle the rest of parameters
export let activities = (access_token, interval, page, per_page) => {
    let p = client.activities(access_token)
    .then((data) => {
      let _activities = _.reduce(data, function (result, act) {
        const id = act.id;
        delete act.id;

        // Create and push a new Activity to the result
        result.push(new models.Activity(id, act));
        return result;
      }, []);
      return _activities;
    });

    return p;
};

export let AthleteType = models.AthleteType;
export let Sex = models.Sex;
export let MeasurementPreference = models.MeasurementPreference;
export let version = require('../package.json').version;
