let Enum = require('../utils').Enum;


// TODO: set the values which format should be validated
//
// badge_type_id: 0,
// clubs: [],
// bikes: [],
// shoes: [] }

const Sex = new Enum({MALE: 'M', FEMALE: 'F'});

const Friend = new Enum({PENDING: 'pending',
                         ACCEPTED: 'accepted',
                         BLOCKED: 'blocked',
                         NULL: null});

const Follower = Friend;

const MeasurementPreference = new Enum({METERS: 'meters', FEET: 'feet'});

const AthleteType = new Enum({CYCLIST: 0, RUNNER: 1});

// All those parameters will be set directly in the Athlete instance
// without any further check
const _unchecked_arguments = [
  'resource_state', 'firstname', 'lastname', 'profile_medium',
  'profile', 'city', 'state', 'country', 'follower_count',
  'friend_count', 'mutual_friend_count', 'email', 'ftp',
  'weight', 'premium', 'created_at', 'updated_at', 'date_preference'
]

class Athlete {
  // This class represents an Athlete, based
  // on the interface defined in http://strava.github.io/api/v3/athlete/

  constructor(id, args) {
    this.id = id;

    // Set arguments that do not require checks
    for (let a of _unchecked_arguments) {
      if (a in args) {
        this[a] = args[a];
      }
    }

    // Work in Enums for predefined values
    if ('sex' in args) {
      this.sex = Sex.assert(args['sex']);
    }

    if ('friend' in args) {
      this.friend = Friend.assert(args['friend']);
    }

    if ('follower' in args) {
      this.follower = Follower.assert(args['follower']);
    }

    if ('athlete_type' in args) {
      this.athlete_type = AthleteType.assert(args['athlete_type']);
    }

    if ('measurement_preference' in args) {
      this.measurement_preference = MeasurementPreference.assert(args['measurement_preference']);
    }

  }
}

exports.Athlete = Athlete;
exports.AthleteType = AthleteType;
exports.Sex = Sex;
exports.Friend = Friend;
exports.Follower = Follower;
exports.MeasurementPreference = MeasurementPreference;
