/*
 Authors :
 Praveen Dumpala, Aditya Kishore
 ================================
 Last Edited : 06-02-2017
 ================================
 Functions:

 getMethod() : This function returns a JSON Object having keys {method, firstIndexToParse, lastIndexToParse}
 1. The type of Method (Controller / Service / Factory) and
 2. First Index to be parsed for dependencies and
 3. Last Index to be parsed for dependencies

 parseDependencies() : This function returns
 1.
 2.
 */

var igenerate = function () {

  this.getParsedFirstIndex = function (data) {
    var firstIndex = 0; // 0 - Corrupted File
    firstIndex = (data.indexOf('function(') !== -1) ? data.indexOf('function(') + 9 : 0;
    firstIndex = (data.indexOf('function (') !== -1) ? data.indexOf('function (') + 10 : firstIndex;
    return firstIndex;
  };

  this.getParsedLastIndex = function (data) {
    var lastIndex = 0; // 0 - Corrupted File
    lastIndex = (data.indexOf('){') !== -1) ? data.indexOf('){') : 0;
    lastIndex = (data.indexOf(') {') !== -1) ? data.indexOf(') {') : lastIndex;
    return lastIndex;
  };

  this.parseDependencies = function (data, callback) {
    if(data.length === 0) {
      return callback(new Error('No Dependencies'), null);
    }
    var result = [];
    result = data.split(',');
    return callback(null, result);
  };

  this.getMethod = function (data, callback) {
    var result = {};
    var methodType = '';
    methodType = (data.indexOf('.controller(') !== 1) ? 'controller' : 'No Method';
    methodType = (data.indexOf('.service(') !== -1) ? 'service' : methodType;
    methodType = (data.indexOf('.factory(') !== -1) ? 'factory' : methodType;
    methodType = (data.indexOf('.directive(') !== -1) ? 'directive' : methodType;

    switch (methodType) {
      case 'controller' :
        result.method = methodType;
        result.firstIndexToParse = this.getParsedFirstIndex(data);
        result.lastIndexToParse = this.getParsedLastIndex(data);
        return callback(null, result);

      case 'service' :
        result.method = methodType;
        result.firstIndexToParse = this.getParsedFirstIndex(data);
        result.lastIndexToParse = this.getParsedLastIndex(data);
        return callback(null, result);

      case 'factory' :
        result.method = methodType;
        result.firstIndexToParse = this.getParsedFirstIndex(data);
        result.lastIndexToParse = this.getParsedLastIndex(data);
        return callback(null, result);

      case 'directive' :
        result.method = methodType;
        result.firstIndexToParse = this.getParsedFirstIndex(data);
        result.lastIndexToParse = this.getParsedLastIndex(data);
        return callback(null, result);

      default :
        return callback(new Error('Corrupted File, Please try again with a proper (.js) file'), null);
    }
  };
};

module.exports = igenerate;