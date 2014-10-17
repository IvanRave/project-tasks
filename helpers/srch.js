var fs = require('fs');

var filterString = function(str) {
  return /#\d\d!/g.test(str);
};

var searchInFile = function(curPush, fileName, err, content) {
  if (err) {
    throw err;
  }

  var strings = content.split('\n');

  strings = strings.filter(filterString);

  var fileReport = {
    file: fileName.replace('/home/ivanrave/gvmg/', ''),
    arr: strings
  };

  curPush(fileReport);
};

var readFile = function(myPush, limit, file, ind) {
  var curPush = myPush.bind(null, limit, ind);

  fs.readFile(file, 'utf8', searchInFile.bind(null, curPush, file));
};

exports.run = function(files, myPush) {
  files.forEach(readFile.bind(null, myPush, files.length));
};

module.exports = exports;
