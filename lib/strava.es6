const client = require('./client');
const models = require('./models');

exports.version = require('../package.json').version;

let athlete = (access_token, athlete=null) => {
    let p = client.athlete(access_token, athlete)
    .then((data) => {
        const id = data.id;
        delete data.id;
        return new models.Athlete(id, data);
    });

    return p;
}
exports.athlete = athlete;
exports.AthleteType = models.AthleteType;
exports.Sex = models.Sex;
exports.MeasurementPreference = models.MeasurementPreference;
