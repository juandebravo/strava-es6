/*jshint esnext: true */
const _ = require('lodash');

import * as client from '../client';
import {Enum} from '../utils';
import {StravaMap} from './stravamap';
import {Athlete} from './athlete';

const WorkoutType = Enum({NULL: null, DEFAULT: 0, RACE: 1, LONG_RUN: 2, INTERVALS: 3});

const ActivityTypes = new Set(
  ['Ride', 'Kitesurf', 'Run', 'NordicSki',
   'Swim', 'RockClimbing', 'Hike', 'RollerSki',
   'Walk', 'Rowing', 'AlpineSki', 'Snowboard',
   'BackcountrySki', 'Snowshoe', 'Canoeing', 'StairStepper',
   'Crossfit', 'StandUpPaddling', 'EBikeRide', 'Surfing',
   'Elliptical', 'VirtualRide', 'IceSkate', 'WeightTraining',
   'InlineSkate', 'Windsurf', 'Kayaking', 'Workout', 'Yoga'
  ]
);

// All those parameters will be set directly in the Activity instance
// without any further check
const _unchecked_arguments = [
  'resource_state', 'external_id', 'upload_id', 'name',
  'distance', 'moving_time', 'elapsed_time', 'total_elevation_gain',
  'start_date', 'start_date_local', 'timezone', 'start_latlng',
  'end_latlng', 'location_city', 'location_state', 'location_country',
  'start_latitude', 'start_longitude', 'achievement_count', 'kudos_count',
  'comment_count', 'athlete_count', 'photo_count', 'trainer',
  'commute', 'manual', 'private', 'flagged', 'average_speed', 'max_speed',
  'average_heartrate', 'max_heartrate', 'total_photo_count', 'has_kudoed'
];

const _optionalParametersToCreate = [
  'description', 'distance',
  'private', 'trainer', 'commute'
];


// athlete: { id: 4681834, resource_state: 1 },
// gear_id: null,

// This class represents an Activity, based
// on the interface defined in http://strava.github.io/api/v3/activity/
export class Activity {

  constructor (id=undefined, args={}) {
    this.id = id;

    // Set arguments that do not require checks
    for (let a of _unchecked_arguments) {
      if (a in args) {
        this[a] = args[a];
      }
    }

    // Work in Enums for predefined values
    if ('workout_type' in args) {
      this.workout_type = WorkoutType.assert(args.workout_type);
    }

    if ('map' in args) {
      this.map = new StravaMap(args.map.id, args.map.summary_polyline, args.map.resource_state);
    }

    if ('athlete' in args) {
      this.athlete = new Athlete(args.athlete.id, {resource_state: args.athlete.resource_state});
    }

    if ('type' in args) {
      if (ActivityTypes.has(args.type)) {
        this.type = args.type;
      } else {
        throw new Error(`Invalid activity type <${args.type}>`);
      }
    }
    // TODO: handle segments
    //curl "https://www.strava.com/api/v3/activities/416339830?include_all_efforts=true&access_token=f5
  }

  save (access_token) {
    if (this.id) {
      let data = {};

      if (this.name) {
        data.name = this.name;
      }

      if (this.type) {
        data.type = this.type;
      }

      if (this.private != undefined) {
        data.private = !!this.private;
      }

      if (this.commute != undefined) {
        data.commute = !!this.commute;
      }

      if (this.trainer != undefined) {
        data.trainer = !!this.trainer;
      }

      if (this.gear_id) {
        // ‘none’ clears gear from activity
        data.gear_id = this.gear_id;
      }

      if (this.description) {
        data.description = this.description;
      }

      let p = client.put(access_token, `activities/${this.id}`, {}, data)
      .then(Activity.fromStrava);

      return p;

    } else {
      // DO POST
      // TODO: validate name, type, start_date_local,
      // elapsed_time
      let data = {
        name: this.name,
        type: this.type,
        start_date_local: this.start_date_local,
        elapsed_time: this.elapsed_time
      };

      for (let v of Object.keys(data)) {
        if (typeof data[v] !== 'string' || data[v] === '') {
          throw new Error(`Parameter <${v}> must be set to create an activity`);
        }
      }

      return new Activity(1234, data);
      //let p = client.post(access_token, 'activities')
      //.then(Activity.fromStrava);
      //return p;
    }
  };

  static findAll(access_token, interval, page, per_page) {
    // handle the rest of parameters
    let p = client.get(access_token, 'athlete/activities')
    .then((data) => {
      let _activities = _.reduce(data, function (result, act) {
        // Create and push a new Activity to the result
        result.push(Activity.fromStrava(act));
        return result;
      }, []);
      return _activities;
    });

    return p;
  };

  static findById(access_token, id, include_all_efforts=false) {
    const queryParams = include_all_efforts ? {include_all_efforts: true} : {};

    let p = client.get(access_token, `activities/${id}`, queryParams)
    .then((data) => {
      return Activity.fromStrava(data);
    });

    return p;
  };

  // Helper to create an `Activity` instance by using the
  // data retrieved from Strava
  static fromStrava(data) {
    const id = data.id;
    delete data.id;
    return new Activity(id, data);
  };
};
