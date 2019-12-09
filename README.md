[![Build Status](https://travis-ci.org/chiku/CRUDzilla.png?branch=master)](https://travis-ci.org/chiku/CRUDzilla)
[![Code Climate](https://codeclimate.com/github/chiku/CRUDzilla.png)](https://codeclimate.com/github/chiku/CRUDzilla)

CRUDZilla
=========

CRUD products with node and mongo.

Evaluate how easy is it to share validations written in javascript across server and client.


How to
------

* Start mongodb daemon
```shell
mongod --nojournal --dbpath db/
```

* Start node application
```shell
node app.js
```

* Run unit tests
```shell
npm run test:unit
```

* Run integration tests (the server & mongodb should be up)
```shell
npm run test:integration
```

License
-------

This repository is released under the MIT license. Please refer LICENSE for more details.
