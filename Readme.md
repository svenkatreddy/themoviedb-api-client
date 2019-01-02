MovieDB
=======
[![Build Status](https://travis-ci.org/svenkatreddy/themoviedb-api-client.svg?branch=master)](https://travis-ci.org/svenkatreddy/themoviedb-api-client)
[![NPM version](https://badge.fury.io/js/themoviedb-api-client.svg)](http://badge.fury.io/js/themoviedb-api-client)
[![Dependency Status](https://img.shields.io/david/svenkatreddy/themoviedb-api-client.svg)](https://david-dm.org/svenkatreddy/themoviedb-api-client)
[![npm](https://img.shields.io/npm/dm/themoviedb-api-client.svg?maxAge=2592000)]()

node.js library that makes the interaction with themoviedb.org V3 API easy.

## Installation
```bash
npm install themoviedb-api-client --save
```
## Usage

Require MovieDB and provide your themoviedb.org API KEY
```js
const MovieDB = require('themoviedb-api-client"')('your api key');
```
Use the api methods as you want, for example:
```js
mdb.searchMovie({ query: 'Alien' }).then((res) => {
  console.log(res.body);
})
.catch(function(error) {
  console.log(error)
});
```
or
```js
mdb.movieInfo({ id: 666}).then((res) => {
  console.log(res.body);
})
.catch(function(error) {
  console.log(error)
});
```

## Available methods

All themoviedb.org API v3 methods included.