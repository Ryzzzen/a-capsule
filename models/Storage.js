class Storage {
  constructor() {
    this._store = {};
  }

  add(k, v) {
    this._store[k] = v;
  }

  set(k, v) {
    this._store[k] = v;
  }

  get(k) {
    console.dir(this._store);
    return this._store[k];
  }

  has(k) {
    return this._store.hasOwnProperty(k);
  }

  default(k, v) {
    if (k && v) this._store[k] = v;
    else {
      var b = { add: (k, v) => { if (!this._store[k]) { this._store[k] = v; }; return b; }, end: async () => await this.save() };
      return b;
    }
  }

  empty() {
    return Object.keys(this._store).length === 0 && this._store.constructor === Object;
  }

  save() { throw Error('This is a memory storage thus it can\'t be saved!') }
  load() { throw Error('This is a memory storage thus it can\'t be loaded!') }
}

module.exports = Storage;
