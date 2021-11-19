// const User = require("../models/user.model");
const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");
const {body, validationResult} = require('express-validator');
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "verysecretkey"; // Key for cryptograpy. Keep it secret
const { db } = require('../config/db.config');

async function login({ email, password }, callback) {

  if(email === ""){
    return callback({
      message: 'Email cannot be empty!',
    });
  }
  if (password === ""){
    return callback({
      message: 'Password cannot be empty!',
    });
  }
  
  let selectQuery = 'SELECT COUNT(*) AS "total", ??, ??, ?? FROM ?? WHERE ?? = ? LIMIT 1';
  let query =  mysql.format(selectQuery, ["password","status", "id", "users", "email", email]);


  db.query(query, (err, data) => {
    if (err) {
      // console.error(err);
      return callback(err);
    }
    // console.log(data[0]);
    if (data[0].total == 0) {
      return callback({
        message: 'Invalid Username/Password!',
      })
    } else {
      if(data[0].status == 0){
        return callback({
          message: 'Account Disabled, contact Admin'
        });
      };
      if (bcrypt.compareSync(password, data[0].password)) {
        const token = auth.generateAccessToken(email);
        return callback(null, {token: token, id: data[0].id});
      } else {
        return callback({
          message: 'Invalid Username/Password!',
        })
      }
    }
  })
}

async function register(params, callback) {
  if (params.username.replace(/\s+/g, '').length === 0) {
    return callback({ message: 'Username Required' });
  }
  if (params.username.replace(/\s+/g, '').length > 15) {
    return callback({
      message: 'Username needs to be less than 15 characters!',
    });
  }

  if (
    params.email.replace(/\s+/g, '').length === 0 ||
    params.email.replace(/\s+/g, '').includes('@') === false) {
    return callback({ message: 'Email Required' })
  }

  if (params.password.length === 0) {
    return callback({ message: 'Password Required' });
  }

  if (params.full_name.replace(/\s+/g, '').length === 0) {
    return callback({ message: 'Full name Required' });
  }

  if (params.full_name.replace(/\s+/g, '').length > 30) {
    return callback({
      message: 'Full name needs to be less than 30 characters!',
    })
  }

  if (params.country.replace(/\s+/g, '').length === 0) {
    return callback({ message: 'Country Required' });
  }

  if (
    !(params.gender.toString().replace(/\s+/g, '') == 0) &&
    !(params.gender.toString().replace(/\s+/g, '') == 1)) {
    return callback({ message: 'Gender Required' })
  }

  if (params.user_type.replace(/\s+/g, '').length === 0) {
    return callback({ message: 'User type Required' })
  }

  // if (params.country.replace(/\s+/g, '').length !== '^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$') {
  //   return callback({ message: 'Incorrect Date' })
  // }

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

async function userProfile(id, callback){
  console.log("services Id: ",id);
  let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
  let query = mysql.format(selectQuery, ["users", "id", id]);
  
  db.query(query, (error, data) =>{
    if(error){
      return callback(error);
    }
    
    if(data < 1){
      return callback({ message: 'User does not exist!' })
    }
    console.log(data[0]);
    return callback(null, data);
  });
}

async function updateUser(params, callback){
  
  if (params.username.replace(/\s+/g, '').length === 0) {
    return callback('Username Required')
  }

  if (params.username.replace(/\s+/g, '').length >= 15) {
    return callback('Username needs to be less than 15 characters!')
  }

  if (params.full_name.replace(/\s+/g, '').length === 0) {
    return callback('Full name Required')
  }

  if (params.full_name.replace(/\s+/g, '').length > 30) {
    return callback('Full name needs to be less than 30 characters!');
  }

let selectQuery = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?'
let query = mysql.format(selectQuery, [
  'users',
  'username',
  params.username,
  'full_name',
  params.full_name,
  'id',
  params.id,
])

  db.query(query, (err, data, fields) => {
    // console.log('Testing', data);
    if(err){
      return callback(err, 'Update Denied');
    }
    if(data.changedRows < 1){
      return callback(new Error('Could not update Mysql'),'Update Failed');
    }
    
    return callback(
      null,
      "User Updated"
    );
  });
}

async function deactivateUser(params, callback){
  let selectQuery =
    'UPDATE ?? SET ?? = ? WHERE ?? = ?';
  let query = mysql.format(selectQuery,[
    "users",
    "status",
    0,
    "id",
    params.id,
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
}
