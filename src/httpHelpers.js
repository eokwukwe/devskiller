const url = require('url');

module.exports = {
  urlPathOf: (request) => url.parse(request.url).pathname,

  urlPathQuery: (request) => url.parse(request.url, true).query,

  urlPathnameArray: (request) =>
    url
      .parse(request.url)
      .pathname.split('/')
      .slice(1),

  respondWith200OkText: (response, textBody) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(textBody);
  },

  respondWith200OkJson: (response, jsonBody) => {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(jsonBody));
  },

  respondWith404NotFound: (response) => {
    response.writeHead(404, {
      'Content-Type': 'application/json',
    });
    response.end();
  },

  respondWith400BadRequest: (response) => {
    response.writeHead(400, {
      'Content-Type': 'application/json',
    });
    response.end();
  },

  respondWith405MethodNotAllowed: (response) => {
    response.writeHead(405, {
      'Content-Type': 'application/json',
    });
    response.end();
  },
};
