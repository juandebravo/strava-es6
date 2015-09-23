require('ass-ert');
var nock = require('nock');

var strava = require('../dist/strava');
var ass = require('ass-ert');

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

describe('strava.client', function() {

  before(function() {
    // Avoid any HTTP request
    nock.disableNetConnect();
  });

  it('should return a valid version number', function () {
    ass(strava.version).match(/^(\d\.){2}\d$/);
  });

  it('should return bar upon calling foo', function () {
    ass(strava.foo()).to.eql('bar');
  });

  it('should retrieve authenticated athlete profile', function (done) {
    var access_token = 'f57facd77c1ee265a0cf2b9b3e28e91fd20f45d';
    mockAthleteRequest(access_token, 4681834);

    strava.athlete(access_token)
    .then(function (data) {
      ass(data).to.match({
        id: 4681834,
        firstname: 'Juan',
        lastname: 'De Bravo'
      });
      done();
    })
    .catch(function (err) {
      done(Error('Invalid HTTP response <' + err + '>'));
    });
  });

});
