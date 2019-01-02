MovieDB
=======
[![Build Status](https://travis-ci.org/svenkatreddy/themoviedb-client.svg?branch=master)](https://travis-ci.org/svenkatreddy/themoviedb-client)
[![NPM version](https://badge.fury.io/js/themoviedb-client.svg)](http://badge.fury.io/js/themoviedb-client)
[![Dependency Status](https://img.shields.io/david/svenkatreddy/themoviedb-client.svg)](https://david-dm.org/svenkatreddy/themoviedb-client)
[![npm](https://img.shields.io/npm/dm/themoviedb-client.svg?maxAge=2592000)]()

node.js library that makes the interaction with themoviedb.org V3 API easy.

## Installation
```bash
npm install themoviedb-client --save
```
## Usage

Require MovieDB and provide your themoviedb.org API KEY
```js
const MovieDB = require('moviedb')('your api key');
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