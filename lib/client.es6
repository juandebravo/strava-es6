/*jshint esnext: true */

const https = require('https');
const _ = require('lodash');

const options = {
  hostname: 'www.strava.com',
  port: 443,
  agent: false
};

let doRequest = (method, access_token, path, queryParams={}, body) => {
  let _options = options;

  // TODO: prevent mutating parameter
  queryParams['access_token'] = access_token;

  const params = _.map(queryParams, function(value, key) {
    return key + '=' + value
  }).join('&');

  _options.path = `/api/v3/${path}?${params}`;
  _options.method = method;

  if (body) {
    body = _.map(body, function(value, key) {
      return key + '=' + value
    }).join('&');

    _options.headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': body.length
    };
  }

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

    if (body != undefined) {
      // write data to request body
      req.write(body);
    }

    req.end();
  });
  return p;
};

module.exports = {
  get: doRequest.bind(null, 'GET'),
  post: doRequest.bind(null, 'POST'),
  put: doRequest.bind(null, 'PUT'),
  delete: doRequest.bind(null, 'DELETE')
};
