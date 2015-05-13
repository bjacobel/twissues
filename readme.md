##twissues
---
*twissues* is a Github Issues viewer developed by Brian Jacobel for the Twitter Fabric team's coding challenge.

####Dependencies
- node (`brew install node`)
- gulp (`npm install -g gulp`)
- mocha (for tests) (`npm install -g mocha`)
- contents of `package.json` (`npm install`)

To run the application, first make sure you have Node and gulp (npm installed. Then,

```
gulp serve
```

A browser window should open to `localhost:9000`, where the application is being served. The application is also deployed at `twissues.bjacobel.com`.

To run the tests, execute:

```
npm test
```