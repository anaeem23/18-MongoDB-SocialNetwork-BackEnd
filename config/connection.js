const { connect, connection } = require('mongoose');

connect('mongodb://localhost/27017/HW18-SocialBackendDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
