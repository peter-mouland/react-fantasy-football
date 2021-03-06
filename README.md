# Kammy [![CircleCI](https://circleci.com/gh/peter-mouland/kammy.svg?style=svg)](https://circleci.com/gh/peter-mouland/kammy)

> An app to play a _custom_ kind of fantasy football

This repo was born from [React-Base-SSR](https://github.com/peter-mouland/react-base-ssr)

The main technologies are React, Koa v2, Babel and Webpack.

Authentication is handled locally with MongoDB as well as Passport integration.

## Dependencies
 
  * `brew instal mongodb`
  * `npm i`

## Running The App

 * Locally (_with hot-reloading_): `npm start`
 * In Production: `npm run build && npm run start:prod`

## Testing

We use BrowserStack to enable us to check the site against multiple browsers and environments.
With NightWatch we are able to do e2e tests against a local browser or multiple browsers (via BrowserStack). 

Currently we have 2 types of e2e tests.  These are `tagged` as:
 * `production` : tests that can be done in a production environment (smoke tests).
    * ie. _safe_ tests that do not manipulate the database.
 * `staging` : Tests that can be run in a test environment.

### Running tests against staging

 > These could be tests that manipulate the Database.
 
`test:e2e-staging`

The purpose of these tests is to run as many tests as possible against multiple browsers to ensure that the app works for our users.

These tests will use `BrowserStack` to run all tests tagged up as `staging` against multiple browsers.
    
### Running tests against production

 > These should be passive ie. _safe_ tests that do not manipulate the database.
 
`test:e2e-production`

The purpose of these tests is to ensure that the vital part of the app has been put live correctly i.e. is the site up after a deployment.

These tests will use `BrowserStack` to run all tests tagged up as `production` against a single browser.

##Debugging 

### Debug React performance via the browser

In non-production environments, [`react-addons-perf`](https://facebook.github.io/react/docs/perf.html) are included in the bundle.  
To make usage easier, (if the user focus is on the document body) we have enabled the following shortcut keys:
 - `s`: Start/Stop the performance tools 
 - `w`: Display `printWasted` (wasted time re-rendering components) 
 - `e`: Display `printExclusive` (overall time taken)
 - `i`: Display `printInclusive` ("Exclusive" times don't include the times taken to mount the components)
 - `o`: Display `printOperations` (prints DOM manipulations i.e. setInnerHTML and Remove)

You can also install [`react-dev-tools`](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and check `highlight updates' to see which components are being re-rendered.

### Debug Node via Chrome Dev Tools

To enable Node debugging in Chrome, you have to do the following as it's still an experimental feature:

- Open the chrome://flags/#enable-devtools-experiments URL
- Enable the Developer Tools experiments flag
- Relaunch Chrome
- Open DevTools Setting -> Experiments tab (it started being visible after the reload)
- Press "SHIFT" 6 times to show the hidden experiments
- Check the "Node debugging" checkbox
- Open/close DevTools



When calling npm start, the server runs node with the `--inspect` argument.
This mode allows you to debug server side node code via Chrome dev tools and you'll see something similar to the following in your terminal output

`To start debugging, open the following URL in Chrome: chrome-devtools://devtools/remote/serve_file/...`

- Open `about:inspect` in Chrome and click the 'Open dedicated DevTools for Node' link
- You'll now see a dedicated DevTools window for your node session.

- Protip the folder structure in the node devtools window can be a little un-intuitive at first, easiest thing to do is press `ctrl+p` to find the file you want and then `reveal in navigator` to see where that file is in the devtools folder structure.

