const nock = require('nock');
const _ = require('lodash');

const activity = require('../../dist/models/activity');
const ass = require('ass-ert');

function mockActivityRequest(access_token) {
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

describe('strava.models.activity.Activity', function () {
  var ACCESS_TOKEN;

  before(function() {
    // Avoid any HTTP request
    nock.disableNetConnect();
    ACCESS_TOKEN = 'foobar';
  });

  it('should retrieve a list of athlete activities', function (done) {
    var access_token = ACCESS_TOKEN;
    mockActivityRequest(access_token);

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

  });

});
