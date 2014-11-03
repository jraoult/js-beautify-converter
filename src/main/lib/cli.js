#!/usr/bin/env node

'use strict';

var util = require('util');
var program = require('commander');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));
var Liftoff = require('liftoff');
var converter = require('../lib/beautify-converter');

var MODULE_NAME = 'js-beautify-converter';

var JsBeautifyConverter = new Liftoff({
  name: 'js-beautify-converter'
})
  .on('require', function(name, module) {
    console.log('Loading external module:', name);
  })
  .on('requireFail', function(name, err) {
    console.log('Unable to load:', name, err);
  });

JsBeautifyConverter.launch({}, invoke);

function invoke(env) {

  if (!env.modulePath) {
    console.error(util.format('No local %s installed found in', MODULE_NAME));
    console.error(util.format('Try execute: npm install %s', MODULE_NAME));
    process.exit(1);
  }

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
    .then(function() {
      process.exit(0);
    })
    .catch(function(e) {
      console.error(e);
      process.exit(1);
    });
}