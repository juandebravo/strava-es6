const nock = require('nock');
const _ = require('lodash');

const activity = require('../../dist/models/activity');
const ass = require('ass-ert');

function mockActivitiesRequest(access_token) {
  var data = [{
        "id": 396507138,
        "resource_state": 2,
        "external_id": "219550735.tcx",
        "upload_id": 445538705,
        "athlete":{
           "id": 4681834,
           "resource_state": 1
        },
        "name":"Running in Barcelona in the afternoon",
        "distance":17284.3,
        "moving_time":4527,
        "elapsed_time":4549,
        "total_elevation_gain":101.9,
        "type":"Run",
        "start_date":"2015-09-20T16:09:32Z",
        "start_date_local":"2015-09-20T18:09:32Z",
        "timezone":"(GMT+01:00) Europe/Madrid",
        "start_latlng":[
           41.38,
           2.15
        ],
        "end_latlng":[
           41.38,
           2.15
        ],
        "location_city":"Barcelona",
        "location_state":"CT",
        "location_country":"Spain",
        "start_latitude":41.38,
        "start_longitude":2.15,
        "achievement_count":14,
        "kudos_count":7,
        "comment_count":1,
        "athlete_count":1,
        "photo_count":0,
        "map":{
           "id":"a396507138",
           "summary_polyline":"qdq{FoibLta@{k@f@s_BhBod@qE_N{]wWyCuRrCqHj`@_NEiDgl@iXaK{G_JyNqDxAiTeUyJuUcLmHwQyZkPgL_EqGmImGqQ}WyElCmMyOwC~@qChEkBhLdBbMnCdFdB~Sha@rgC_@jDlJpJdExO`J|McAnJ|fC`sDgDzH",
           "resource_state":2
        },
        "trainer":false,
        "commute":false,
        "manual":false,
        "private":false,
        "flagged":false,
        "gear_id":null,
        "average_speed":3.818,
        "max_speed":11.9,
        "average_heartrate":161.9,
        "max_heartrate":171,
        "total_photo_count":0,
        "has_kudoed":false,
        "workout_type":null
     },
     {
        "id":396505874,
        "resource_state":2,
        "external_id":"219550081.tcx",
        "upload_id":445537264,
        "athlete":{
           "id":4681834,
           "resource_state":1
        },
        "name":"Running in Barcelona in the afternoon",
        "distance":10426.9,
        "moving_time":2890,
        "elapsed_time":2893,
        "total_elevation_gain":50.6,
        "type":"Run",
        "start_date":"2015-09-17T18:47:33Z",
        "start_date_local":"2015-09-17T20:47:33Z",
        "timezone":"(GMT+01:00) Europe/Madrid",
        "start_latlng":[
           41.38,
           2.15
        ],
        "end_latlng":[
           41.38,
           2.15
        ],
        "location_city":"Barcelona",
        "location_state":"CT",
        "location_country":"Spain",
        "start_latitude":41.38,
        "start_longitude":2.15,
        "achievement_count":1,
        "kudos_count":0,
        "comment_count":0,
        "athlete_count":1,
        "photo_count":0,
        "map":{
           "id":"a396505874",
           "summary_polyline":"}~p{FgrbL`\\ef@b@ufA{@mVjC_f@OsDiDkEw^yX}@yNbCaJhZmMxStDr^pAyCyAw@mHmGtC{_@kCw`@pNkDjHdE~Sh]dW|EfI_C|q@n@`s@q@vGjArVwInM",
           "resource_state":2
        },
        "trainer":false,
        "commute":false,
        "manual":false,
        "private":false,
        "flagged":false,
        "gear_id":null,
        "average_speed":3.608,
        "max_speed":6.3,
        "total_photo_count":0,
        "has_kudoed":false,
        "workout_type":null
     },
     {
        "id":393910669,
        "resource_state":2,
        "external_id":"215627113.tcx",
        "upload_id":442823055,
        "athlete":{
           "id":4681834,
           "resource_state":1
        },
        "name":"Running in Barcelona in the afternoon",
        "distance":7392.8,
        "moving_time":2015,
        "elapsed_time":2035,
        "total_elevation_gain":167.9,
        "type":"Run",
        "start_date":"2015-09-15T18:33:05Z",
        "start_date_local":"2015-09-15T20:33:05Z",
        "timezone":"(GMT+01:00) Europe/Madrid",
        "start_latlng":[
           41.38,
           2.15
        ],
        "end_latlng":[
           41.38,
           2.15
        ],
        "location_city":"Barcelona",
        "location_state":"CT",
        "location_country":"Spain",
        "start_latitude":41.38,
        "start_longitude":2.15,
        "achievement_count":4,
        "kudos_count":3,
        "comment_count":0,
        "athlete_count":1,
        "photo_count":0,
        "map":{
           "id":"a393910669",
           "summary_polyline":"y_q{FstbL~ACtXy_@vAV|[{PFgJmFoGk@qG~A}OhEaJ}BmHx@yCMeKzA~LzFzHDtW|@tFzLjXbKwB|FxDxMd^{L`D_EtEUdEhD|E_@tGqF?mNlJaLmFcBaDqBqOuIcJkK|FgD{ByCbBuC}C_ApA",
           "resource_state":2
        },
        "trainer":false,
        "commute":false,
        "manual":false,
        "private":false,
        "flagged":false,
        "gear_id":null,
        "average_speed":3.669,
        "max_speed":5.6,
        "total_photo_count":0,
        "has_kudoed":false,
        "workout_type":null
     }
  ];
  nock('https://www.strava.com:443')
  .get('/api/v3/athlete/activities')
  .query({access_token: access_token})
  .reply(
    200,
    data,
      {
        date: 'Sat, 26 Sep 2015 14:39:54 GMT',
        etag: '7019c890b236377db4fb3111760ae7d5',
        status: '200 OK',
        connection: 'Close',
        'cache-control': 'max-age=0, private, must-revalidate',
        'content-type': 'application/json; charset=UTF-8',
        'set-cookie': [ '_strava3_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJTk0NmU5ZDZhMDE4OGQyYTI5MTI1OTlhNWZjYjgxNTAwBjsAVEkiEGNsZWFyX2NsaWNrBjsARlQ%3D--a1e2ea68a6dafda829a792efae2730405015f9ce; domain=strava.com; path=/; HttpOnly' ],
        'strava-athlete-upload-version': 'f2d96c1ba7acf4c8b06ae7845f7338b2',
        'x-ratelimit-limit': '600,30000',
        'x-ratelimit-usage': '21,30',
        'x-request-id': 'fcafb870c4114dce32c1b3d97cba1884',
        'x-ua-compatible': 'IE=Edge,chrome=1',
        'transfer-encoding': 'chunked',
      }
  );
}

function mockActivityRequest(access_token, activity_id, include_all_efforts) {
  // TODO: include segments
  var data = {
    id: activity_id,
    resource_state: 3,
    external_id: '251313404.tcx',
    upload_id: 466108041,
    name: 'Running in Barcelona in the afternoon. Best pace of the season!!!!',
    distance: 10213.2,
    moving_time: 2665,
    elapsed_time: 2669,
    total_elevation_gain: 39.4,
    start_date: '2015-10-19T18:12:26Z',
    start_date_local: '2015-10-19T20:12:26Z',
    timezone: '(GMT+01:00) Europe/Madrid',
    start_latlng: [ 41.38, 2.15 ],
    end_latlng: [ 41.38, 2.15 ],
    location_city: 'Barcelona',
    location_state: 'CT',
    location_country: 'Spain',
    start_latitude: 41.38,
    start_longitude: 2.15,
    achievement_count: 5,
    kudos_count: 1,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    average_speed: 3.832,
    max_speed: 4.5,
    average_heartrate: 165,
    max_heartrate: 196,
    total_photo_count: 0,
    has_kudoed: false,
    workout_type: null,
    map: {
      id: 'a416339830',
      summary_polyline: 's`q{FitbLbDLnX_c@Pu~A~Ack@gDcFc_@qYs@aOzBuIhZoMnNbDnc@pBiC_Bo@wGaH`Cq]sCo`@fQeC`J~AjP`]pVdEzFwAhx@d@jpAcDzE',
      resource_state: 3
    },
    athlete: {
      id: 4681834,
      resource_state: 1
    },
    type: 'Run'
  };

  var query = {access_token: access_token};
  if (include_all_efforts) {
    query.include_all_efforts = true;
  }
  nock('https://www.strava.com:443')
  .get('/api/v3/activities/' + activity_id)
  .query(query)
  .reply(
    200,
    data,
      {
        date: 'Sat, 26 Sep 2015 14:39:54 GMT',
        etag: '7019c890b236377db4fb3111760ae7d5',
        status: '200 OK',
        connection: 'Close',
        'cache-control': 'max-age=0, private, must-revalidate',
        'content-type': 'application/json; charset=UTF-8',
        'set-cookie': [ '_strava3_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJTk0NmU5ZDZhMDE4OGQyYTI5MTI1OTlhNWZjYjgxNTAwBjsAVEkiEGNsZWFyX2NsaWNrBjsARlQ%3D--a1e2ea68a6dafda829a792efae2730405015f9ce; domain=strava.com; path=/; HttpOnly' ],
        'strava-athlete-upload-version': 'f2d96c1ba7acf4c8b06ae7845f7338b2',
        'x-ratelimit-limit': '600,30000',
        'x-ratelimit-usage': '21,30',
        'x-request-id': 'fcafb870c4114dce32c1b3d97cba1884',
        'x-ua-compatible': 'IE=Edge,chrome=1',
        'transfer-encoding': 'chunked',
      }
  );

  return data;

}

describe('strava.models.activity.Activity', function () {
  var ACCESS_TOKEN;

  beforeEach(function() {
    // Avoid any HTTP request
    nock.disableNetConnect();
    ACCESS_TOKEN = 'foobar';
  });

  it('should retrieve a list of athlete activities', function (done) {
    var access_token = ACCESS_TOKEN;
    mockActivitiesRequest(access_token);

    activity.Activity.findAll(access_token)
    .then(function (data) {
      ass(data).array.and(
        ass.size.eq(3),
        ass.pluck('id').every.number.and(
          ass.match(/^\d{9}$/)
        ),
        ass.pluck('upload_id').every.number.and(
          ass.match(/^\d{9}$/)
        ),
        ass.pluck('start_date').every.match(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
        ),
        ass.pluck('start_date_local').every.match(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
        )
      );
      done();
    })
    .catch(function (err) {
      console.log(err);
      done(error);
    });
  });

  it('should raise Error if activity data includes an invalid type', function () {
    ass(function () {
      new activity.Activity(396507138, {type: 'InvalidType'});
    }).raises(Error).prop('message').eql('Invalid activity type <InvalidType>');
  });

  it('should raise Error if activity data includes invalid workout type', function () {
    ass(function () {
      new activity.Activity(396507138, {workout_type: 4});
    }).raises(Error).prop('message').eql('Invalid value 4 for the Enum');
  });

  describe('#save()', function() {
    var required_fields = ['name', 'type', 'start_date_local', 'elapsed_time'];

    _.forEach(required_fields, function (value) {
      it('should raise Error while creating an activity if ' + value + ' is not defined', function () {
        var _activity = new activity.Activity();

        // Assign a default value to the rest of the
        // required params
        _.forEach(required_fields, function (val) {
          if (val !== value) {
            _activity[val] = 'foo-bar';
          }
        });

        ass(function () {
          _activity.save();
        }).raises(Error).prop('message').eql('Parameter <' + value + '> must be set to create an activity');
      });
    });

    it('should format a Date instance to ISO 8601 format');

    _.forEach(["private", "commute", "trainer"], function (option) {

      _.forEach([true, false], function (value) {

        it('should set the ' + option + ' flag to ' + value, function (done) {
          var ACTIVITY_ID = 416339830;

          // Inject the `option value` programmatically to
          // prevent `option` to be the dict key
          var response = {"id": ACTIVITY_ID};
          response[option] = value;

          nock('https://www.strava.com:443')
          .put('/api/v3/activities/' + ACTIVITY_ID)
          .query({access_token: ACCESS_TOKEN})
          .reply(
            200,
            response,
            { }
          );

          var _activity = new activity.Activity(416339830);
          _activity.private = value;
          _activity.save(ACCESS_TOKEN)
          .then(function (data) {
            ass(data[option]).to.eql(value);
            done();
          })
          .catch(function (error) {
            done(error);
          });
        });

      });

    });

    it('should set the trainer flag if it is defined');

    it('should set the commute flag if it is defined');

  });

  describe('#findById()', function () {

    before(function() {
      // Avoid any HTTP request
      nock.disableNetConnect();
    });

    it('should return an activity by using its id', function () {
      var ACTIVITY_ID = '416339830'

      var data = mockActivityRequest(ACCESS_TOKEN, ACTIVITY_ID);

      activity.Activity.findById(ACCESS_TOKEN, ACTIVITY_ID)
      .then(function (act) {
        // Check that we're getting an `Activity` instance
        ass(act.constructor.name).eql('Activity');

        // Remove the values that are converted to an instance
        delete data.map;
        delete data.athlete;

        // Check that the primitive values are set properly
        _.forEach(data, function (value, key) {
          ass(act[key]).to.eql(value);
        });

        // Validate the created objects
        ass(act.map.constructor.name).eql('StravaMap');
        ass(act.map.id).to.eql('a416339830');

        ass(act.athlete.constructor.name).eql('Athlete');
        ass(act.athlete.id).to.eql(4681834);

        // That was cool while checking the data received :)
        // It could be removed, but keeping in honour of composition
        ass(act).to.match({
          athlete: ass.match({
            id: 4681834,
            resource_state: 1
          }),
          map: ass.match({
            id: 'a416339830',
            resource_state: 3
          })
        });
      })
      .catch(function (err) {
        console.log(err);
        done(error);
      });
    });

    it('should return an activity and its efforts by using its id', function () {
      var ACTIVITY_ID = '416339830'

      var data = mockActivityRequest(ACCESS_TOKEN, ACTIVITY_ID, true);

      activity.Activity.findById(ACCESS_TOKEN, ACTIVITY_ID, true)
      .then(function (act) {
        // Check that we're getting an `Activity` instance
        ass(act.constructor.name).eql('Activity');

        // Remove the values that are converted to an instance
        delete data.map;
        delete data.athlete;

        // Check that the primitive values are set properly
        _.forEach(data, function (value, key) {
          ass(act[key]).to.eql(value);
        });

        // Validate the created objects
        ass(act.map.constructor.name).eql('StravaMap');
        ass(act.map.id).to.eql('a416339830');

        ass(act.athlete.constructor.name).eql('Athlete');
        ass(act.athlete.id).to.eql(4681834);

        // That was cool while checking the data received :)
        // It could be removed, but keeping in honour of composition
        ass(act).to.match({
          athlete: ass.match({
            id: 4681834,
            resource_state: 1
          }),
          map: ass.match({
            id: 'a416339830',
            resource_state: 3
          })
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    });
  });

});
