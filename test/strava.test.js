const strava = require('../dist/strava');
const ass = require('ass-ert');

describe('strava.client', function () {

  it('should return a valid version number', function () {
    ass(strava.version).match(/^(\d\.){2}\d$/);
  });

});
