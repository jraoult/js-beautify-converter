'use strict';

var libxmljs = require('libxmljs');

function toIntelliJ(jsbConfig) {

  var options = jsbConfig || {};
  var opt = {};

  opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  opt.indent_char = options.indent_char ? options.indent_char : ' ';
  opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
  opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
  opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
//  opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
  opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
//  opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
  opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
  opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
  opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
//  opt.e4x = (options.e4x === undefined) ? false : options.e4x;
//  opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;

  var doc = new libxmljs.Document();
  var componentNode =
    doc
      .node('project').attr({version: 4})
      .node('component').attr({name: 'ProjectCodeStyleSettingsManager'});
  componentNode
    .node('option').attr({name: 'USE_PER_PROJECT_SETTINGS', value: true});
  var valueNode =
    componentNode
      .node('option').attr({name: 'PER_PROJECT_SETTINGS'})
      .node('value');
  var codeStyleSettingsNode =
    valueNode
      .node('codeStyleSettings').attr({language: 'JavaScript'});
  var jsCodeStyleSettings =
    valueNode
      .node('JSCodeStyleSettings');


  // indentation
  var indentOptionsNode =
    codeStyleSettingsNode
      .node('indentOptions');

  indentOptionsNode
    .node('option').attr({name: 'INDENT_SIZE', value: opt.indent_size});
  indentOptionsNode
    .node('option').attr({name: 'CONTINUATION_INDENT_SIZE', value: opt.indent_size});

  if (opt.indent_char !== ' ') {
    indentOptionsNode
      .node('option').attr({name: 'USE_TAB_CHARACTER', value: true});
  }

  codeStyleSettingsNode
    .node('option').attr({name: 'KEEP_LINE_BREAKS', value: opt.preserve_newlines });

  codeStyleSettingsNode
    .node('option').attr({name: 'KEEP_BLANK_LINES_IN_CODE', value: opt.max_preserve_newlines });

  jsCodeStyleSettings
    .node('option').attr({name: 'SPACE_BEFORE_FUNCTION_LEFT_PARENTH', value: opt.space_after_anon_function});

  return doc.toString();
}

console.log(toIntelliJ({indent_size: 2, indent_char: '   '}));

module.exports = {
  toIntelliJ: toIntelliJ
};