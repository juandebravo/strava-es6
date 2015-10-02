/*jshint esnext: true */

const Enum = require('../utils').Enum;
const StravaMap = require('./stravamap').StravaMap;
const Athlete = require('./athlete').Athlete;

const WorkoutType = Enum({NULL: null, DEFAULT: 0, RACE: 1, LONG_RUN: 2, INTERVALS: 3});

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
  'average_heartrate', 'max_heartrate', 'total_photo_count', 'has_kudoed',
  'type'
];

// athlete: { id: 4681834, resource_state: 1 },
// gear_id: null,

// This class represents an Activity, based
// on the interface defined in http://strava.github.io/api/v3/activity/
class Activity {

  constructor (id, args) {
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
  }
}

exports.Activity = Activity;
