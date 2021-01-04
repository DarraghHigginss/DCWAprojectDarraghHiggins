var mysql = require('promise-mysql');
var pool

mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  password: 'abcdefgh',
  database: 'geography'
})
  .then((result) => {
    pool = result
  })
  .catch((error) => {
    console.log(error)
  });

var getCities = function () {

  return new Promise((resolve, reject) => {
    pool.query('select * from city')
      .then((result) => { // occurs when the promise is successful
        resolve(result)
      })
      .catch((error) => { // occurs when the promise is unsuccessful
        reject(error)
        //console.log(error)
      })
  })
}

var getCountries = function () {

  return new Promise((resolve, reject) => {
    pool.query('select * from country')
      .then((result) => { // occurs when the promise is successful
        resolve(result)
      })
      .catch((error) => { // occurs when the promise is unsuccessful
        reject(error)
        //console.log(error)
      })
  })
}

var getCityDetails = function (cty_code) {
  return new Promise((resolve, reject) => {
    var myQuery = {
      sql: 'select * from city where cty_code = ?', // retrieving information about specific city
      values: [cty_code]
    }
    pool.query(myQuery)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

var addCountry = function (co_code, co_name, co_details) {
  return new Promise((resolve, reject) => {
    pool.query('insert into country (co_code, co_name, co_details) values("' + co_code + '","' + co_name + '","' + co_details + '")')
      //Below is when the promise is succesful 
      .then((result) => {
        console.log("okay")
        resolve(result)
      })
      //Below is when the promise is unsuccesful 
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = { getCities, getCountries, getCityDetails, addCountry }
