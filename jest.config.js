module.exports = {
  verbose: false,
  maxWorkers: 1,
  testRegex:'/tests/.*/*.test.js?',//where is test
  coveragePathIgnorePatterns:[
    "<rootDir>/node_modules/",
   ], //what not to coverage
}