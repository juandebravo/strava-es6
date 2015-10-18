/*jshint esnext: true */

import * as models from './models';

// TODO: create a Proxy to reference to the relevant
// static methods in Athlete
export let athlete = models.Athlete;

// TODO: create a Proxy to reference to the relevant
// static methods in Activity
export let activities = models.Activity;

export let AthleteType = models.AthleteType;
export let Sex = models.Sex;
export let MeasurementPreference = models.MeasurementPreference;
export let version = require('../package.json').version;
