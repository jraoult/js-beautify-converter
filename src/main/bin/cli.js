#!/usr/bin/env node

var program = require('commander');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));
var converter = require('../lib/beautify-converter');

program
    .usage('[INPUT] [OUTPUT]')
    .parse(process.argv);

var inputName = program.args.length ? program.args[0] : '.jsbeautifyrc';

fs.readFileAsync(inputName)
    .then(function (json) {
        return converter.toIntelliJ(JSON.parse(json));
    })
    .then(function (converted) {
        console.log(converted);
    })
    .catch(SyntaxError, function (e) {
        console.error('Invalid JS Beautifier config file. It should be a well formed JSON file.');
    })
    .error(function (e) {
        if (e.cause.code === 'ENOENT') {
            console.error('Could not find any JS Beautifier config file.');
        } else {
            console.error('Unable to read the given JS Beautifier config file because:', e.message);
        }
    });


