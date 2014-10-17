var handleTask = function(fileReport, task) {
  return task.trim();
};

// item - {file, arr}
var handleItem = function(fileReport) {
  fileReport.arr = fileReport.arr.map(handleTask.bind(null, fileReport));
  return fileReport;
};

exports.run = function(report, next) {
  report = report.map(handleItem);
  next(null, report);
};
