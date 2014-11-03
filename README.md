# js-beautify-converter

A simple command line tool to convert a [JS Beautifier](https://github.com/beautify-web/js-beautify) code style to an IntelliJ formater configuration file.

## Installation

`js-beautify-converter` has to be installed globally to provide the command line script but locally as well. The global script will look for a local installation to run.

`npm install -g git+ssh://git@github.com:jraoult/js-beautify-converter.git`

and then

`npm install git+ssh://git@github.com:jraoult/js-beautify-converter.git`

## Usage

You can run the command from the project root:
`js-beautify-converter`

By default it looks for a file named `.jsbeautifyrc` and generates `.idea/codeStyleSettings.xml`. Input and output file can be specified:

`js-beautify-converter the-code-style.json my-intellij-cs-file.xml`


 
The supported options are:
```
indent_size
indent_char
preserve_newlines
max_preserve_newlines
space_in_paren
space_after_anon_function
opt.wrap_line_length
```
