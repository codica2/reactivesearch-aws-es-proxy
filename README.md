# [Reactivesearch -> Amazon Elasticsearch Service] proxy server

Simple lambda created for connection your Reactivesearch with AWS Elasticsearch.

## Usage

1. Clone this repo:
```
git clone https://github.com/codica2/reactivesearch-aws-es-proxy
```

2. Install dependencies:
```bash
yarn
```

3. Change `app.js` for your needs

4. Install [The Serverless Framework](https://www.npmjs.com/package/serverless):
```bash
yarn global add serverless
```

5. Setup credentials for the serverless framework:
```bash
serverless config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY
```

6. Change `serverless.yml` for your needs

7. Deploy to AWS lambda
```bash
serverless deploy
```

## List of ENV variables used

```
APP_URL                   // Your app url
APP_AWS_ES_REGION         // AWS Elasticsearch region
APP_AWS_ES_DOMAIN         // AWS Elasticsearch domain
APP_AWS_ACCESS_KEY_ID     // AWS_ACCESS_KEY_ID for role with access to AWS Elasticsearch
APP_AWS_SECRET_ACCESS_KEY // AWS_SECRET_ACCESS_KEY for role with access to AWS Elasticsearch
```

## About Codica

[![Codica logo](https://www.codica.com/assets/images/logo/logo.svg)](https://www.codica.com)

We love open source software! See [our other projects](https://github.com/codica2) or [hire us](https://www.codica.com/) to design, develop, and grow your product.
