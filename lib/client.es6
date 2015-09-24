const https = require('https');

const options = {
  hostname: 'www.strava.com',
  port: 443,
  agent: false
};

let doRequest = (method, access_token, path, body) => {
  let _options = options;
  _options.path = '/api/v3/' + path + '?access_token=' + access_token;
  _options.method = method;

  let p = new Promise( (resolve, reject) => {
    let req = https.request(_options, (res) => {
      let data = '';
      const code = res.statusCode;
      const headers = res.headers;

      res.on('data', d => {
        data += d.toString();
      });

      res.on('end', function() {
        if (code === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(code);
        }
      });
    });

    req.on('error', function (e) {
      reject(e);
    });

    req.end()
  });
  return p;
}

let get = doRequest.bind(null, 'GET');

let athlete = (access_token) => {
  return get(access_token, 'athlete');
}

exports.athlete = athlete;
