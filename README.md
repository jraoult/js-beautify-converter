## js-beautify-converter
A command line tool to convert a [JS Beautifier](https://github.com/beautify-web/js-beautify) code style to an IntelliJ formater configuration file.

## Getting Started
==

#### Install `js-beautify-converter` globally:
`js-beautify-converter` has to be installed globally to install the command. The globaly installed command will look for a local installation to execute.

`npm install -g git+ssh://git@github.com:jraoult/js-beautify-converter.git`

#### Install `js-beautify-converter`  in your project devDependencies:
`npm install git+ssh://git@github.com:jraoult/js-beautify-converter.git`

#### Run `js-beautify-converter`
IntelliJ IDEA closed and from the project root, run:
```
js-beautify-converter
```

By default it looks for a file named `.jsbeautifyrc` and generates `.idea/codeStyleSettings.xml`. Input and output files can be specified both absolutely and relatively:
```
js-beautify-converter the-code-style.json my-intellij-cs-file.xml
```
 
### Supported JS Beautifier options:
I try to support as many options as possible whne it makes sense. Some options don't have an equivalence in IntelliJ.

* `indent_size`
* `indent_char`
* `preserve_newlines`
* `max_preserve_newlines`
* `space_in_paren`
* `space_after_anon_function`
* `wrap_line_length`

### Supported IntelliJ versions
So far, I tested `js-beautify-converter` with:
* IntelliJ IDEA 13
* IntelliJ IDEA 14
