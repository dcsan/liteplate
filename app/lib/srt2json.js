"use strict";

var fs = require('fs');
let path = require('path');
let subsPath = './public/media/subs';
let srtFile = 'MartinJacques_2010S.srt';

let inPath = path.join(subsPath, srtFile);
let outPath = path.join(subsPath, srtFile.replace("srt", "json"));

fs.readFile(inPath, function(error, data) {
    if (error) { throw error; }

    var text = data.toString();
    var lines = text.split('\n');

    var output = [];
    var buffer = {
        content: []
    };

    lines.forEach(function(line) {
        if (!buffer.id) {
          buffer.id = line;
        } else if ( !buffer.start ) {
            var range = line.split(' --> ');
            buffer.start = range[0];
            buffer.end = range[1];
        } else if (line !== '') {
            buffer.content.push(line);
        } else {
            output.push(buffer);
            buffer = {
                content: []
            };
        }
    });

    fs.writeFile(outPath, JSON.stringify(output, null, 4));
});
