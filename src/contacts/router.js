const {
  urlPathOf,
  respondWith200OkJson,
  urlPathQuery,
  respondWith400BadRequest,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

const _ = require('lodash');

function handle(request, response) {
  if (request.method !== 'GET') {
    respondWith405MethodNotAllowed(response);
    return routerHandleResult.HANDLED;
  }

  const contacts = fakeDatabase.selectAllFromContacts();
  const query = urlPathQuery(request);

  if (_.has(query, 'phrase')) {
    if (_.get(query, 'phrase') === '') {
      respondWith400BadRequest(response);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().match(_.get(query, 'phrase').toLowerCase()),
      );

      respondWith200OkJson(response, filtered);
    }
    return routerHandleResult.HANDLED;
  }

  if (_.has(query, 'limit')) {
    const limit = _.get(query, 'limit');
    if (!/^\d+$/.test(limit)) {
      respondWith400BadRequest(response);
    } else {
      const con = contacts.slice(0, limit);
      respondWith200OkJson(response, con);
    }
    return routerHandleResult.HANDLED;
  }

  respondWith200OkJson(response, contacts);
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
