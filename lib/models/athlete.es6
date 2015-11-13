/*jshint esnext: true */

import * as client from '../client';

import {Enum} from '../utils';

// TODO: set the values which format should be validated
//
// badge_type_id: 0,
// clubs: [],
// bikes: [],
// shoes: [] }

export const Sex = Enum({MALE: 'M', FEMALE: 'F', RATHER_NOT_SAY: null});

export const Friend = Enum({PENDING: 'pending',
                            ACCEPTED: 'accepted',
                            BLOCKED: 'blocked',
                            NULL: null});

export const Follower = Friend;

export const MeasurementPreference = Enum({METERS: 'meters', FEET: 'feet'});

export const AthleteType = Enum({CYCLIST: 0, RUNNER: 1});

// All those parameters will be set directly in the Athlete instance
// without any further check
const _unchecked_arguments = [
  'resource_state', 'firstname', 'lastname', 'profile_medium',
  'profile', 'city', 'state', 'country', 'follower_count',
  'friend_count', 'mutual_friend_count', 'email', 'ftp',
  'weight', 'premium', 'created_at', 'updated_at', 'date_preference'
];

// This class represents an Athlete, based
// on the interface defined in http://strava.github.io/api/v3/athlete/
export class Athlete {

  constructor(id, args) {
    this.id = id;

    if (args == undefined) {
      return;
    }

    // Set arguments that do not require checks
    for (let a of _unchecked_arguments) {
      if (a in args) {
        this[a] = args[a];
      }
    }

    // Work in Enums for predefined values
    if ('sex' in args) {
      this.sex = Sex.assert(args.sex);
    }

    if ('friend' in args) {
      this.friend = Friend.assert(args.friend);
    }

    if ('follower' in args) {
      this.follower = Follower.assert(args.follower);
    }

    if ('athlete_type' in args) {
      this.athlete_type = AthleteType.assert(args.athlete_type);
    }

    if ('measurement_preference' in args) {
      this.measurement_preference = MeasurementPreference.assert(args.measurement_preference);
    }

  }

  save (access_token, city=null, state=null, sex=null, weight=null) {
    // sex (string): 'M' or 'F', any other value will set to null and displayed as "rather not say"
    // weight (float): kilograms
  };

  // Retrieves the athlete instance stats
  stats (access_token) {
    return client.get(access_token, `athletes/${this.id}/stats`);
  }

  // Retrieves the athlete stats.
  // As `athlete_id` is mandatory in Strava API,
  // it's transparenty retrieved via findByAccessToken
  static stats (access_token) {
    return Athlete.findByAccessToken(access_token)
    .then( athlete => athlete.stats(access_token));
  }

  // Retrieves the athlete instance stats
  koms (access_token) {
    return client.get(access_token, `athletes/${this.id}/koms`);
  }

  static koms (access_token) {
    return Athlete.findByAccessToken(access_token)
    .then( athlete => athlete.koms(access_token));
  }

  // Returns an Athlete based on the access token
  static findByAccessToken(access_token) {
    const p = client.get(access_token, 'athlete')
    .then(Athlete.fromStrava);

    return p;
  };

  // Returns an Athlete based on the athlete id
  static findById(access_token, athlete_id) {
    const p = client.get(access_token, `athletes/${athlete_id}`)
    .then(Athlete.fromStrava);

    return p;
  };

  // Helper to create an `Athlete` instance by using the
  // data retrieved from Strava
  static fromStrava(data) {
    const id = data.id;
    delete data.id;
    return new Athlete(id, data);
  }

}
