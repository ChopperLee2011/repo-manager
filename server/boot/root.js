module.exports = function(server) {
  var path = require('path');

  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  //router.get('/', server.loopback.status());
  router.get('/', (req, res) => res.sendFile(path.resolve('client/index.html')));


  server.use(router);
};
