var walk = require('./helpers/walk');
var srch = require('./helpers/srch');
var prior = require('./helpers/prior');
var fs = require('fs');

var prj = process.argv[2];
if (!prj) {
  throw new Error('required project name');
}

var filterByFileName = function(fileName) {
  var rgxp = /\/node_modules\/|\.git\/|\/bower_components\/|\/dst\/|\/dev\//g;
  return (rgxp.test(fileName) === false);
};

var handlePrior = function(err, result) {
  console.log(result);
  fs.writeFile('./reports/' + prj + '.json', JSON.stringify(result));
};

var result = [];

var pushToResult = function(limit, ind, fileReport) {
  if (fileReport.arr.length > 0) {
    result.push(fileReport);
  }

  if (ind === limit - 1) {
    prior.run(result, handlePrior);
  }
};

walk.run('../' + prj, function(err, files) {
  if (err) throw err;

  files = files.filter(filterByFileName);
  //  console.log(files);
  srch.run(files, pushToResult);
});
