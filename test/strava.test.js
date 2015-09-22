require('ass-ert');

var strava = require('../dist/strava');
var ass = require('ass-ert');

describe('strava', function() {
    it('should return a valid version number', function () {
      ass(strava.version).match(/^\d\.\d\.\d$/);
    });

    it('should return bar upon calling foo', function () {
      ass(strava.foo()).to.eql('bar');
    });

    it('should retrieve authenticated athlete profile', function (done) {
        strava.athlete('f57facd77c1ee265a0cf2b9b3e28e91fd20f45d')
        .then(function (data) {
          ass(data.id).to.equal(4681834);
          done();
        })
        .catch(function (err) {
          done(Error("Invalid HTTP response <" + err + ">"));
        });
    });

});
