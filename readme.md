##twissues
---
*twissues* is a Github Issues viewer developed by Brian Jacobel for the Twitter Fabric team's coding challenge.

####Dependencies
- node (`brew install node`)
- gulp (`npm install -g gulp`)
- bower (`npm install -g bower`)
- contents of `package.json` (`npm install`)
- contents of `bower.json` (`bower install`)

(In the distributable zipfile of this repository, I have removed `node_modules` but preserved `bower_components` due to considerations of archive size. You will need to run `npm install` but not `bower install`.)

To run the application, first make sure you have Node and gulp installed. Then,

```
npm install
bower install
gulp serve
```

A browser window should open to `localhost:9000`, where the application is being served. The application is also deployed at [`twissues.bjacobel.com`](http://twissues.bjacobel.com).

To run the tests, execute:

```
npm test
```

Tests are currently: [![Build Status](https://magnum.travis-ci.com/bjacobel/twissues.svg?token=9aA5Qy32HLtuNYqyRvx3&branch=master)](https://magnum.travis-ci.com/bjacobel/twissues)