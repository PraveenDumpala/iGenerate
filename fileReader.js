var fs = require('fs');
var IGen = require('./lib/igenerate.js');
var igenInstance = new IGen();


fs.readFile(process.cwd() + '/test_files/controller/addUserCtrl.js', 'utf8', function (err, data) {
//fs.readFile(process.cwd() + '/test_files/service/formatDisplayDate.js', 'utf8', function (err, data) {
//fs.readFile(process.cwd() + '/test_files/directive/compareTo.js', 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  //console.log(data);
  igenInstance.getMethod(data, function (error, method_indexes) {
    if (error) {
      return console.erro(error);
    }
    //console.log(method_indexes);
    var line = data.substring(method_indexes.firstIndexToParse, method_indexes.lastIndexToParse);
    igenInstance.parseDependencies(line, function (err, depInjected) {
      if( err ) {
        console.error(err.message);
        return 0;
      }
      console.log('Dependencies Injected are: ', depInjected);
      return 0;
    });
  });

});
