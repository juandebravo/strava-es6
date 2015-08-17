var strava = require('../lib/strava');
var ass = require('ass-ert');

describe('strava', function() {
    it('should return a valid version number', function () {
        ass(strava.version).match(/^\d\.\d\.\d$/);
    });
});
