'use strict';

var libxmljs = require('libxmljs');

function appendOption(parent, name, value) {
  return parent.node('option').attr({name: name, value: value});
}

function toIntelliJ(jsbConfig) {

  var options = jsbConfig || {};
  var opt = {};

  opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
  opt.indent_char = options.indent_char ? options.indent_char : ' ';
  opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
  opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
  //opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
//  opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
  opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;

  // doesn't really match anything
//  opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;

// not defined properly enough
//    opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
//    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
  opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
//  opt.e4x = (options.e4x === undefined) ? false : options.e4x;
//  opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;

  var doc = new libxmljs.Document();
  var componentNode =
    doc
      .node('project').attr({version: 4})
      .node('component').attr({name: 'ProjectCodeStyleSettingsManager'});
  appendOption(componentNode, 'USE_PER_PROJECT_SETTINGS', true);
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
  appendOption(valueNode, 'AUTODETECT_INDENTS', false);

  var indentOptionsNode = codeStyleSettingsNode.node('indentOptions');
  appendOption(indentOptionsNode, 'INDENT_SIZE', opt.indent_size);
  appendOption(indentOptionsNode, 'CONTINUATION_INDENT_SIZE', opt.indent_size);
  appendOption(indentOptionsNode, 'USE_TAB_CHARACTER', opt.indent_char !== ' ');


  appendOption(codeStyleSettingsNode, 'KEEP_LINE_BREAKS', opt.preserve_newlines);
  appendOption(codeStyleSettingsNode, 'KEEP_BLANK_LINES_IN_CODE', opt.max_preserve_newlines);


  // space_in_paren is not a single parameter in IntelliJ
  ['SPACE_WITHIN_METHOD_CALL_PARENTHESES', 'SPACE_WITHIN_METHOD_PARENTHESES', 'SPACE_WITHIN_IF_PARENTHESES',
    'SPACE_WITHIN_WHILE_PARENTHESES', 'SPACE_WITHIN_FOR_PARENTHESES', 'SPACE_WITHIN_CATCH_PARENTHESES',
    'SPACE_WITHIN_SWITCH_PARENTHESES']
    .forEach(function(name) {
      appendOption(codeStyleSettingsNode, name, opt.space_in_paren);
    });

  appendOption(jsCodeStyleSettings, 'SPACE_BEFORE_FUNCTION_LEFT_PARENTH', opt.space_after_anon_function);


  appendOption(valueNode, 'RIGHT_MARGIN', opt.wrap_line_length === 0 ? 9999 : opt.wrap_line_length);


  return doc.toString();
}

exports.toIntelliJ = toIntelliJ;