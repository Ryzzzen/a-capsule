const fs = require('fs'), crypto = require('crypto');
const Storage = require('./Storage');

class EncryptedStorage extends Storage {
  constructor(path, password, algorithm) {
    super();
    this.path = path || 'settings.json.lkd';

    if (!password)
      throw new Error('To use the encrypted storage, you need a password first');

    this.password = password;
    this.algorithm = algorithm || 'aes256';
  }


  encrypt(text) {
    var cipher = crypto.createCipher(this.algorithm, this.password)
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt(text) {
    try {
      var decipher = crypto.createDecipher(this.algorithm, this.password);
      var dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    }
    catch(e) {
      console.dir(e.message);
      throw e;
    }
  }

  saveSync() {
    fs.writeFileSync(this.path, this.encrypt(JSON.stringify(this._store, null)), 'utf8');
  }

  save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, this.encrypt(JSON.stringify(this._store, null)), 'utf8', function(err) {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  }

  _readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve({});
          }
          else {
            reject(err);
          }
        }
        else {
          resolve(JSON.parse(this.decrypt(data)));
        }
      });
    });
  }

  async load() {
    this._store = await this._readFile();
  }


  loadSync() {
    try {
      this._store = JSON.parse(this.decrypt(fs.readFileSync(this.path, 'utf8')));
    }
    catch(err) {
      if (err.code === 'ENOENT') {
        return {};
      }

      throw err;
    }
  }
}

module.exports = EncryptedStorage;
