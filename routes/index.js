var express = require('express');
var superagent = require('superagent');

var router = express.Router();

var apiHost = 'https://api-sandbox.dwolla.com';
var accountsHost = 'https://accounts-sandbox.dwolla.com';

// Copy values from Dwolla Dashboard.
var applicationKey = '';
var applicationSecret = '';

var applicationName = 'OAuth Demo';
var redirectUri = 'http://localhost:9000/callback';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dwolla Integration OAuth Demo' });
});

router.get('/auth', function(req, res, next) {
  // Build the link to begin OAuth flow.
  res.render('auth', { title: 'Get a token', appName: applicationName, authLink: `${accountsHost}/auth?redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${encodeURIComponent(applicationKey)}` }); 
});

router.get('/callback', function(req, res, next) {
  var code = req.query.code;
  var authHeader = 'Basic ' + new Buffer(applicationKey + ':' + applicationSecret, 'UTF-8').toString('base64');
  
  // Exchange code for access token.
  superagent
    .post(`${accountsHost}/token`)
    .field('code', code)
    .field('grant_type', 'authorization_code')
    .field('redirect_uri', redirectUri)
    .set('Authorization', authHeader)
    .end((err, resp) => {
      var accessToken = resp.body.access_token;
      var headers = { 'Accept': 'application/vnd.dwolla.v1.hal+json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken };
      
      // Request the root resource to discover resource links.
      superagent
        .get(apiHost + '/')
        .set(headers)
        .end((err, rootResp) => {
          var accountRoute = rootResp.body._links.account.href;

          // Request the account resource.
          superagent
            .get(accountRoute)
            .set(headers)
            .end((err, accountResp) => {
              var accountName = accountResp.body.name;
              var customersRoute = accountResp.body._links.customers.href;
              var fundingSourcesRoute = accountResp.body._links['funding-sources'].href;

              // Request the account's customers list.
              superagent
                .get(customersRoute)
                .set(headers)
                .end((err, customerResp) => {
                  // Request the account's funding sources.
                  superagent
                    .get(fundingSourcesRoute)
                    .set(headers)
                    .end((err, fsResp) => {
                      var fundingSources = [];
                      
                      if (fsResp.statusCode != 200) {
                        fundingSources.push({ name: fsResp.body.message });
                      } else {
                        fundingSources = fsResp.body._embedded['funding-sources'];
                      }

                      res.render('details', { accessToken, fundingSources, accountName, customers: customerResp.body._embedded.customers });
                    });
                });
            });
        });
    });
});

module.exports = router;
