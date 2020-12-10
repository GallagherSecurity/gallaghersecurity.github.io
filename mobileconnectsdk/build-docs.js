#!/usr/bin/env node
// Requires nodejs, the 'markdown-it' and 'highlight.js' npm modules to be installed. Sorry

'use strict';

var fs = require('fs');
var glob = require('glob');
var hljs = require('highlight.js'); // https://highlightjs.org/
var md = require('markdown-it')({ 
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
     
        return ''; // use external default escaping
      }
});

var header = fs.readFileSync('header-template.html');
var footer = fs.readFileSync('footer-template.html');

function processFile(infile, outfile) {
    console.log(`${infile} => ${outfile}`);

    fs.readFile(infile, 'utf8', function (err, input) {
        var output;
    
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('File not found: ' + infile);
                process.exit(2);
            }
        
            console.error(err.stack || err.message || String(err));
            process.exit(1);
        }
    
        try {
            output = md.render(input);
        } catch (e) {
            console.error(e.stack || e.message || String(e));
            process.exit(1);
        }
    
        fs.writeFile(outfile, header + output + footer, function(err) {
            if(err) {
                console.error(err.stack || err.message || String(err));
            }
        });
    });
}
if (!fs.existsSync('html')){
    fs.mkdirSync('html');
}
for (var infile of glob.sync("*.md")) {
    processFile(infile, "html/" + infile.replace(/.md$/, '.html')); // preserve filenames but put them all in the html subfolder
}
