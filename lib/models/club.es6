/*jshint esnext: true */

let Enum = require('../utils').Enum;

const ClubType = Enum({CASUAL_CLUB: 'casual_club',
                       RACING_TEAM: 'racing_team',
                       SHOP: 'shop',
                       COMPANY: 'company',
                       OTHER: 'other'});

const SportType = Enum({CYCLING: 'cycling',
                        RUNNING: 'running',
                        TRIATHLON: 'triathlon',
                        OTHER: 'other'});

// All those parameters will be set directly in the Club instance
// without any further check
const _unchecked_arguments = [
  'resource_state', 'name', 'profile_medium', 'profile', 'description',
  'city', 'state', 'country', 'private', 'member_count'
];

// This class represents a Club, based
// on the interface defined in http://strava.github.io/api/v3/clubs/
class Club {

  constructor(id, args) {
    this.id = id;

    // Set arguments that do not require checks
    for (let a of _unchecked_arguments) {
      if (a in args) {
        this[a] = args[a];
      }
    }

    // Work in Enums for predefined values
    if ('club_type' in args) {
      this.club_type = ClubType.assert(args.club_type);
    }

    if ('sport_type' in args) {
      this.sport_type = SportType.assert(args.sport_type);
    }

  }
}

exports.Club = Club;
exports.SportType = SportType;
exports.ClubType = ClubType;
