#!/usr/bin/env node

var util = require('util');
var program = require('commander');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));
var converter = require('../lib/beautify-converter');

program
  .usage('[INPUT] [OUTPUT]')
  .parse(process.argv);

var inputName = program.args.length ? program.args[0] : '.jsbeautifyrc';
var outputName = program.args.length > 1 ? program.args[1] : '.idea/codeStyleSettings.xml';

fs.readFileAsync(inputName)
  .error(function() {
    return Promise.reject('Could not find any JS Beautifier config file. You should pass the path as first arguments or ' +
      'the ".jsbeautifyrc" should be present in the current directory');
  })
  .then(function(json) {
    return converter.toIntelliJ(JSON.parse(json));
  })
  .catch(SyntaxError, function() {
    return Promise.reject('Invalid JS Beautifier config file. It should be a well formed JSON file.');
  })
  .then(function(converted) {
    return fs.writeFileAsync(outputName, converted);
  })
  .error(function() {
    return Promise.reject(
      util.format('Could not generate the code style file "%s". Did you check if the parent directory exists?',
        outputName));
  })
  .catch(function(e) {
    console.error(e);
  });


