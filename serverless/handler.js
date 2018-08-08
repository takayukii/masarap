'use strict';

function graphql(event, context, callback) {
  require('./dist/serverless')(event, context, callback)
    .then()
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  graphql
};
