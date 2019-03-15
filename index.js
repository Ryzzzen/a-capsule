const path = require('path');

module.exports = {
  Storage: require(path.join(__dirname, 'models', 'Storage.js')),
  FileStorage: require(path.join(__dirname, 'models', 'FileStorage.js')),
  EncryptedStorage: require(path.join(__dirname, 'models', 'EncryptedStorage.js'))
};
