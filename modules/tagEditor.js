/*
  Saves tags to JSON file
 */

const fs = require('fs');
const tags = require('./../tags.json');

const saveTags = () => fs.writeFileSync(`${__dirname}/../tags.json`, JSON.stringify(tags), 'utf8');

module.exports = {
  get: name => (name ? tags[name] : tags),
  set: (name, value) => {
    tags[name] = value;
    saveTags();
  },
  delete: (name) => {
    delete tags[name];
    saveTags();
  },
};
