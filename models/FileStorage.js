"use strict";

const fs = require('fs');
const Storage = require('./Storage');

class FileStorage extends Storage {
  constructor(path) {
    super();
    this.path = path || 'settings.json';
  }

  saveSync(readable) {
    fs.writeFileSync(this.path, JSON.stringify(this._store, null, readable ? 2 : null), 'utf8');
  }

  save(readable) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(this._store, null, readable ? 2 : null), 'utf8', function(err) {
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
      fs.readFile(this.path, 'utf8', function(err, data) {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve({});
          }
          else {
            reject(err);
          }
        }
        else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  async load() {
    this._store = await this._readFile();
    return this;
  }

  loadSync() {
    try {
      this._store = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    }
    catch(err) {
      if (err.code === 'ENOENT') { this._store = {}; }
      else throw err;
    }
  }
}

module.exports = FileStorage;
