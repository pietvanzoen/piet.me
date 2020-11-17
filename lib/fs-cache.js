const assert = require('assert');
const fs = require('fs');
const { basename } = require('path');
const Debug = require('debug');

const humanKb = (bytes) =>
  `${Math.round((bytes / 1024 + Number.EPSILON) * 100) / 100}Kb`;

class Cache {
  constructor(path) {
    assert(path);
    this.path = path;
    this.store = new Map();
    this.debug = Debug(`cache:${basename(path)}`);
    if (fs.existsSync(path)) {
      this.load();
    }
  }

  load() {
    const raw = fs.readFileSync(this.path, 'utf-8');
    const json = JSON.parse(raw);
    const newStore = new Map();
    Object.keys(json).forEach((key) => newStore.set(key, json[key]));
    this.store = newStore;
    this.debug(`Cache loaded (${humanKb(raw.length)})`);
    return this;
  }

  save() {
    const json = JSON.stringify(Object.fromEntries(this.store), null, 2);
    this.debug(`Saving cache (${humanKb(json.length)})`);
    fs.writeFileSync(this.path, json);
    this.debug(`Cache saved`);
    return this;
  }

  get(key) {
    return this.store.get(key);
  }

  set(key, value) {
    assert(key);
    this.store.set(key, value);
    this.save();
    return this;
  }

  has(key) {
    return this.store.has(key);
  }

  clear() {
    this.debug(`Clearing cache`);
    this.store = new Map();
    this.save();
    return this;
  }
}

module.exports = Cache;
