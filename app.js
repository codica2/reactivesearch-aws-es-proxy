const express = require('express');
const app = express();

const serverless = require('serverless-http');

const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(bodyParser.text({ type: 'application/x-ndjson' }));

app.use((req, _res, next) => {
  const { body } = req;
  console.log('Verifying requests ✔\n', body);

  next();
});

const region = process.env.APP_AWS_ES_REGION;
const domain = process.env.APP_AWS_ES_DOMAIN; // e.g. 'search-***.eu-west-2.es.amazonaws.com';

const endpoint = new AWS.Endpoint(domain);

const credentials = new AWS.Credentials(process.env.APP_AWS_ACCESS_KEY_ID, process.env.APP_AWS_SECRET_ACCESS_KEY);

// Rewrite as you want
app.use('*', async (req, res, next) => {
  const { body } = req;

  const request = new AWS.HttpRequest(endpoint, region);

  request.method = 'POST';
  request.path = req.baseUrl;
  if (body) {
    if (typeof body === 'object') {
      request.body = JSON.stringify(body);
    } else {
      request.body = body;
    }
  }
  request.headers['host'] = domain;
  request.headers['Content-Type'] = 'application/json';

  const signer = new AWS.Signers.V4(request, 'es');
  signer.addAuthorization(credentials, new Date());

  const client = new AWS.HttpClient();
  const clientHandleRequest = await new Promise((resolve, reject) => {
    client.handleRequest(request, null, async function (response) {
      let responseBody = '';
      await response.on('data', function (chunk) {
        responseBody += chunk;
      });
      resolve(responseBody);
    }, function (error) {
      console.log('Error: ' + error);
      reject();
    });
  })

  res.setHeader('Content-Type', 'application/json');
  res.send(clientHandleRequest);
  next()
});

// app.listen(7777, () => console.log('Server running at http://localhost:7777 🚀')); // for development
module.exports.handler = serverless(app);
