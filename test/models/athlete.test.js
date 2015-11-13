const nock = require('nock');
const _ = require('lodash');

const strava = require('../../dist/strava');
const athlete = require('../../dist/models/athlete');
const ass = require('ass-ert');

function mockAthleteRequest(access_token, athlete_id) {
  nock('https://www.strava.com:443')
  .get('/api/v3/athlete')
  .query({access_token: access_token})
  .reply(
    200,
    {
      id: athlete_id,
      resource_state: 3,
      firstname: 'Juan',
      lastname: 'De Bravo',
      profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/4681834/1674221/1/medium.jpg',
      profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/4681834/1674221/1/large.jpg',
      city: 'Barcelona',
      state: 'CT',
      country: 'Spain',
      sex: 'M',
      friend: null,
      follower:null,
      premium: false,
      created_at: '2014-05-02T14:21:54Z',
      updated_at: '2015-08-12T16:16:50Z',
      badge_type_id: 0,
      follower_count: 23,
      friend_count: 16,
      mutual_friend_count: 0,
      athlete_type: 0,
      date_preference: '%m/%d/%Y',
      measurement_preference: 'meters',
      email: 'juandebravo@gmail.com',
      ftp: null,
      weight: 73,
      clubs: [],
      bikes: [],
      shoes:[]
    },
    {
      date: 'Wed, 23 Sep 2015 22:52:19 GMT',
      etag: '188b871de69c2dd04cadddfddb381b63',
      status: '200 OK',
      connection: 'Close',
      'cache-control': 'max-age=0, private, must-revalidate',
      'content-type': 'application/json; charset=UTF-8',
      'set-cookie': ['_strava3_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWQ0ZTVkYWEyOTYxNTk2MWUzZDI5YmQ0M2I5Y2JlZmQyBjsAVEkiEGNsZWFyX2NsaWNrBjsARlQ%3D--72301c46d14b02c4ef7c7011604f8b2cc50a20eb; domain=strava.com; path=/; HttpOnly'],
      'x-ratelimit-limit': '600,30000',
      'x-ratelimit-usage': '1,1',
      'x-request-id': 'e009c60657aecb261f7fa8e6e684096b',
      'x-ua-compatible': 'IE=Edge,chrome=1',
      'content-length': '700',
    }
  );
}

function mockAthleteStatsRequest(access_token, athlete_id) {
  nock('https://www.strava.com:443')
  .get('/api/v3/athletes/'+athlete_id+'/stats')
  .query({access_token: access_token})
  .reply(
    200,
    { biggest_ride_distance: 202062,
      biggest_climb_elevation_gain: 1919.4,
      recent_ride_totals:
       { count: 0,
         distance: 0,
         moving_time: 0,
         elapsed_time: 0,
         elevation_gain: 0,
         achievement_count: 0 },
      recent_run_totals:
       { count: 6,
         distance: 65362.69921875,
         moving_time: 17404,
         elapsed_time: 17851,
         elevation_gain: 538.7410583496094,
         achievement_count: 26 },
      ytd_ride_totals:
       { count: 19,
         distance: 1309285,
         moving_time: 206776,
         elapsed_time: 245663,
         elevation_gain: 33494 },
      ytd_run_totals:
       { count: 59,
         distance: 624718,
         moving_time: 176302,
         elapsed_time: 183641,
         elevation_gain: 9224 },
      all_ride_totals:
       { count: 49,
         distance: 4020312,
         moving_time: 617464,
         elapsed_time: 696799,
         elevation_gain: 99793 },
      all_run_totals:
       { count: 72,
         distance: 756410,
         moving_time: 213720,
         elapsed_time: 226158,
         elevation_gain: 10076 }
      },
    {
      date: 'Wed, 23 Sep 2015 22:52:19 GMT',
      etag: '188b871de69c2dd04cadddfddb381b63',
      status: '200 OK',
      connection: 'Close',
      'cache-control': 'max-age=0, private, must-revalidate',
      'content-type': 'application/json; charset=UTF-8',
      'set-cookie': ['_strava3_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWQ0ZTVkYWEyOTYxNTk2MWUzZDI5YmQ0M2I5Y2JlZmQyBjsAVEkiEGNsZWFyX2NsaWNrBjsARlQ%3D--72301c46d14b02c4ef7c7011604f8b2cc50a20eb; domain=strava.com; path=/; HttpOnly'],
      'x-ratelimit-limit': '600,30000',
      'x-ratelimit-usage': '1,1',
      'x-request-id': 'e009c60657aecb261f7fa8e6e684096b',
      'x-ua-compatible': 'IE=Edge,chrome=1',
      'content-length': '700',
    }
  );
}

describe('strava.models.athlete.Athlete', function () {
  var ACCESS_TOKEN;
  var ATHLETE_ID = 4681834;

  beforeEach(function() {
    // Avoid any HTTP request
    nock.disableNetConnect();
    ACCESS_TOKEN = 'foobar';
  });

  it('should retrieve authenticated athlete profile', function (done) {
    mockAthleteRequest(ACCESS_TOKEN, 4681834);

    strava.athlete.findByAccessToken(ACCESS_TOKEN)
    .then(function (data) {
      ass(data).to.match({
        id: 4681834,
        firstname: 'Juan',
        lastname: 'De Bravo',
        athlete_type: strava.AthleteType.CYCLIST,
        sex: strava.Sex.MALE,
        measurement_preference: strava.MeasurementPreference.METERS
      });
      done();
    })
    .catch(function (err) {
      done(Error('Invalid HTTP response <' + err + '>'));
    });
  });

  it('should retrieve athlete per identifier', function (done) {
    var athlete_id = 553155;

    nock('https://www.strava.com:443')
    .get('/api/v3/athletes/' + athlete_id)
    .query({access_token: ACCESS_TOKEN})
    .reply(
      200,
      {
        id: athlete_id,
        firstname: 'gil',
        lastname: 'cohen',
        profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/553155/1354795/1/medium.jpg',
        profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/553155/1354795/1/large.jpg',
        city: 'Ramat Ha Sharon',
        state: null,
        country: 'Israel',
        sex: 'M',
        friend: 'accepted',
        follower: 'accepted',
        premium: false,
        created_at: '2012-05-25T21:10:23Z',
        updated_at: '2015-09-25T12:00:00Z'
      },
      {
        date: 'Wed, 23 Sep 2015 22:52:19 GMT',
        etag: '188b871de69c2dd04cadddfddb381b63',
        status: '200 OK',
        connection: 'Close',
        'cache-control': 'max-age=0, private, must-revalidate',
        'content-type': 'application/json; charset=UTF-8',
        'set-cookie': ['_strava3_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWQ0ZTVkYWEyOTYxNTk2MWUzZDI5YmQ0M2I5Y2JlZmQyBjsAVEkiEGNsZWFyX2NsaWNrBjsARlQ%3D--72301c46d14b02c4ef7c7011604f8b2cc50a20eb; domain=strava.com; path=/; HttpOnly'],
        'x-ratelimit-limit': '600,30000',
        'x-ratelimit-usage': '1,1',
        'x-request-id': 'e009c60657aecb261f7fa8e6e684096b',
        'x-ua-compatible': 'IE=Edge,chrome=1',
        'content-length': '700',
      }
    );

    strava.athlete.findById(ACCESS_TOKEN, athlete_id)
    .then(function (data) {
      ass(data).to.match({
        id: 553155,
        firstname: 'gil',
        lastname: 'cohen',
        sex: strava.Sex.MALE
      });
      done();
    })
    .catch(function (err) {
      done(Error('Invalid HTTP response <' + err + '>'));
    });
  });

  it('should retrieve athlete stats', function (done) {
    mockAthleteStatsRequest(ACCESS_TOKEN, ATHLETE_ID);

    var totals = {
      count: ass.number,
      distance: ass.number,
      moving_time: ass.number,
      elapsed_time: ass.number,
      elevation_gain: ass.number,
    };

    var athlete = new strava.athlete(ATHLETE_ID);

    athlete.stats(ACCESS_TOKEN)
    .then(function (data) {
      ass(data).to.match({
        biggest_ride_distance: ass.number,
        biggest_climb_elevation_gain: ass.number,
        recent_ride_totals: ass.to.match(totals),
        recent_run_totals: ass.to.match(totals),
        ytd_ride_totals: ass.to.match(totals),
        ytd_run_totals: ass.to.match(totals),
        all_ride_totals: ass.to.match(totals),
        all_run_totals: ass.to.match(totals)
      });
      done();
    })
    .catch(function (err) {
      done(Error('Invalid HTTP response <' + err + '>'));
    });
  });

  it('should retrieve athlete stats by means of access token', function (done) {
    mockAthleteRequest(ACCESS_TOKEN, ATHLETE_ID);
    mockAthleteStatsRequest(ACCESS_TOKEN, ATHLETE_ID);

    var totals = {
      count: ass.number,
      distance: ass.number,
      moving_time: ass.number,
      elapsed_time: ass.number,
      elevation_gain: ass.number,
    };

    strava.athlete.stats(ACCESS_TOKEN)
    .then(function (data) {
      ass(data).to.match({
        biggest_ride_distance: ass.number,
        biggest_climb_elevation_gain: ass.number,
        recent_ride_totals: ass.to.match(totals),
        recent_run_totals: ass.to.match(totals),
        ytd_ride_totals: ass.to.match(totals),
        ytd_run_totals: ass.to.match(totals),
        all_ride_totals: ass.to.match(totals),
        all_run_totals: ass.to.match(totals)
      });
      done();
    })
    .catch(function (err) {
      done(Error('Invalid HTTP response <' + err + '>'));
    });
  });

});
