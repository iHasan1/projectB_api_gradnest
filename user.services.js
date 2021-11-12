// const User = require("../models/user.model");
const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");

const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "verysecretkey"; // Key for cryptograpy. Keep it secret
var msg91 = require("msg91")("API_KEY", "SENDER_ID", "ROUTE_NO");
const { db } = require('../config/db.config');

async function login({ email, password }, callback) {
  
  let selectQuery = 'SELECT COUNT(*) AS "total", ?? FROM ?? WHERE ?? = ? LIMIT 1';
  let query =  mysql.format(selectQuery, ["password", "users", "email", email]);

  db.query(query, (err, data) => {
    if(err){
      return callback(null);
    }

    if(data[0].total == 0){
      return callback({
        message: "Invalid Username/Password!",  
      });
    }
    else {
      if (bcrypt.compareSync(password, data[0].password)) {
        const token = auth.generateAccessToken(email);
        return callback(null, token);
      } else {
        return callback({
          message: 'Invalid Username/Password!',
        });
      }
    }
  });
}

async function register(params, callback) {
  if (params.username === undefined) {
    return callback({ message: "Username Required"});
  }

  if (params.email === undefined) {
    return callback({ message: 'Email Required' });
  }

  let selectQuery = 'SELECT COUNT(*) AS "total" FROM ?? WHERE ?? = ? LIMIT 1';
  let query = mysql.format(selectQuery, [
    "users",
    "email",
    params.email,
  ]);

  db.query(query, (err, data) => {
    if(err) {
      return callback(err);
    }

    if(data[0].total > 0){
      return callback({message: "Email already exists!"});
    }
    else{
      db.query(`INSERT INTO users(username, password, email, dob, full_name, user_type, country, gender)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [params.username, params.password, params.email, params.dob, params.full_name, params.user_type, params.country, params.gender],
      (error, results, fields) => {
        if(error){
          return callback(error);
        }

        return callback(null, "User registered successfully!");
      });
    }
  });
}

async function userProfile({email}, callback){
  console.log(email)
  let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
  let query = mysql.format(selectQuery, ["users", "email", email]);

  db.query(query, (err, data) =>{
    if(err){
      return callback(err);
    }else {
      return callback(null, data);
    }
  });
}

async function updateUser(params, callback){
  let selectQuery =
    'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
  let query = mysql.format(selectQuery,[
    "users",
    "username",
    params.username,
    'full_name',
    params.full_name,
    'dob',
    params.dob,
    'gender',
    params.gender,
    'country',
    params.country,
    "email",
    params.email,
  ]);

  db.query(query, (err, data) => {
    console.log('Testing', data);
    if(err){
      return callback(err);
    } else {
      return callback(null, "User updated");
    }
  });
};

async function deactivateUser(params, callback){
  let selectQuery =
    'UPDATE ?? SET ?? = ? WHERE ?? = ?';
  let query = mysql.format(selectQuery,[
    "users",
    "status",
    0,
    "email",
    params.email,
  ]);

  db.query(query, (err, data) => {
    // console.log('Testing', data);
    if(err){
      return callback(err);
    } else {
      return callback(null, "User deactivated.");
    }
  });
};


module.exports = {
  login,
  register,
  userProfile,
  updateUser,
  deactivateUser,
};
