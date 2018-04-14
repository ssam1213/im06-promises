/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var readFile = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var gitFile = require('./promisification').getGitHubProfileAsync;

console.log('git', gitFile);


console.log('readfile', readFile);


// Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO

  return readFile(readFilePath)
    .then(function (data) {
      return data = gitFile(data);
    })
    .then(function (a) {
      console.log('data', a);
      return new Promise(function(resolve, reject) {
        fs.writeFile(writeFilePath, JSON.stringify(a), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(a);
          }
        });
      });

    });
};



// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};