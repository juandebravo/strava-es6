let foo = () => 'bar';

const https = require('https');

let doRequest = (method, access_token, path, body) => {
  const options = {
    hostname: 'www.strava.com',
    port: 443,
    path: '/api/v3/' + path + '?access_token=' + access_token,
    method: method,
    agent: false
  };

  let p = new Promise(function(resolve, reject) {
    https.request(options, (res) => {
      let body = '';
      const code = res.statusCode;
      const headers = res.headers;

      res.on('data', d => {
        body += d.toString();
      });

      res.on('end', function() {
        if (200 <= code && code < 400) {
          resolve(JSON.parse(body));
        } else {
          reject(code);
        }
      });

    }).on('error', function(e) {
      reject(e);
    });
  });
  return p;
}

let get = doRequest.bind(null, 'GET');

let athlete = (access_token) => {
  return get(access_token, 'athlete');
}

exports.foo = foo;
exports.athlete = athlete;
