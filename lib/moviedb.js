
/*
 * Module dependencies
 */

const debug = require('debug')('themoviedb-api-client');
const perf = require('execution-time')(debug);

var request = require('superagent');
var endpoints = require('./endpoints.json');

let APIKEY;
let session_id;
let token;

/*
 * Exports the constructor
 */

module.exports = function(api_key, base_url) {
  if(api_key) return new MovieDB(api_key, base_url);
  else throw new Error('Bad api key');
};

/*
 * Constructor
 */

function MovieDB(api_key, base_url) {
  APIKEY = api_key;
  if(base_url) endpoints.base_url = base_url;
  return this;
}

/*
 * API request token
 */

MovieDB.prototype.requestToken = function(fn){
  var self = this;

  request
  .get(endpoints.base_url  + endpoints.authentication.requestToken)
  .query({'api_key': APIKEY})
  .set('Accept', 'application/json')
  .end(function(err, res){
    if(err) {
      fn(err);
    } else {
      token = res.body;
      fn();
    }
  });

  return this;
};

/*
 * API session
 */

MovieDB.prototype.session = function(fn){
  var self = this;

  request
  .get(endpoints.base_url  + endpoints.authentication.session)
  .query({'api_key': APIKEY, 'request_token': token.request_token})
  .set('Accept', 'application/json')
  .end(function(err, res){
    if(err) {
      fn(err);
    } else {
      if (res.body.success) {
        session_id = res.body.session_id;
        fn();   
      } 
      else fn(res.body);
    }
  });

  return this;
};

/*
 * Generate API methods
 */

Object.keys(endpoints.methods).forEach(function(method){
  var met = endpoints.methods[method];
  Object.keys(met).forEach(function(m){
    MovieDB.prototype[method + m] = function(params, fn){

      if("function" == typeof params) {
        fn = params;
        params = {};
      }
      
      return execMethod(met[m].method, params, met[m].resource);
    };
  });
});

var execMethod = function(type, params, endpoint){
  return new Promise(function(resolve, reject){
    
    params = params || {};
    endpoint = endpoint.replace(':id', params.id).replace(':season_number', params.season_number).replace(':episode_number', params.episode_number);
    type = type.toUpperCase();
    
    perf.start(endpoint);
    
    const req = request(type, endpoints.base_url + endpoint)
      .query({api_key : APIKEY, session_id: session_id})
      .set('Accept', 'application/json');
      
    if (params.ifNoneMatch) {
      req.set('If-None-Match', params.ifNoneMatch);
      
    } else if (params.ifModifiedSince) {
      var t=params.ifModifiedSince;
      if (t.toUTCString) {
        t=t.toUTCString();
      }
      req.set('If-Modified-Since', t);
    }  
    
    if(type === 'GET') {
      req.query(params)
    }
    else {
      req.send(params)
    }
    
    return req.then(function (arg1, arg2, arg3) {
      resolve(arg1, arg2, arg3);
      perf.stop(endpoint);
    }).catch(reject);
  });
  
};
