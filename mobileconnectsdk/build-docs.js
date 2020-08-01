#!/usr/bin/env node
// Requires nodejs, the 'markdown-it' and 'highlight.js' npm modules to be installed. Sorry

'use strict';

var fs = require('fs');
var path = require('path');
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

var files = {
    'releases.md': 'html/releases.html',
    'API Changes between vMCA13.2.024 and vMCA14.0.002 SDK.md': 'html/API Changes between vMCA13.2.024 and vMCA14.0.002 SDK.html',
    'API Changes between vMCI13.2.044 and vMCI14.0.007 SDK.md': 'html/API Changes between vMCI13.2.044 and vMCI14.0.007 SDK.html'
};
if (!fs.existsSync('html')){
    fs.mkdirSync('html');
}
for (var infile in files) {
    // check if the property/key is defined in the object itself, not in parent
    if (files.hasOwnProperty(infile)) {           
        processFile(infile, files[infile]);
    }
}
