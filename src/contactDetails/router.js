const _ = require('lodash');

const {
  respondWith200OkJson,
  urlPathnameArray,
  respondWith404NotFound,
  respondWith405MethodNotAllowed,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  if (!(request.method === 'GET' || request.method === 'DELETE')) {
    respondWith405MethodNotAllowed(response);
    return routerHandleResult.HANDLED;
  }

  const id = urlPathnameArray(request)[1];
  const contact = fakeDatabase.selectFromContactsById(id);

  if (_.isEmpty(contact)) {
    respondWith404NotFound(response);
    return routerHandleResult.HANDLED;
  }

  if (request.method === 'GET') {
    respondWith200OkJson(response, contact);
  } else {
    const remaingContants = fakeDatabase.deleteContactsById(id);
    respondWith200OkJson(response, remaingContants);
  }

  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
