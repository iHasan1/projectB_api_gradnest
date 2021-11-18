const bcrypt = require("bcryptjs");
const userServices = require("../services/user.services");

/**
 * 1. To secure the password, we are using the bcryptjs, It stores the hashed password in the database.
 * 2. In the SignIn API, we are checking whether the assigned and retrieved passwords are the same or not using the bcrypt.compare() method.
 * 3. In the SignIn API, we set the JWT token expiration time. Token will be expired within the defined duration.
 */
const register = (req, res, next) => {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  req.body.password = bcrypt.hashSync(password, salt);

  userServices.register(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  userServices.login({ email, password }, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

const userProfile = (req, res) => {
  const id = req.params.id;
  console.log(id);
  // console.log(email, typeof email);
  userServices.userProfile( id, (error, results) => {
    if(error){
      return res.status(401).json({ message: 'Unauthorized User!!' });
    }

    return res.status(200).json({
      message: "Authorized User",
      data: results,
    });
  });
};

const updateUser = (req, res, next) => {
  userServices.updateUser(req.body, ({error}, { message: results}) => {
    if (error) {
      console.log(error);
      return res.status(400).send({
        message: 'Failed',
        data: results,
      }) 
    }
    console.log(error, results)
    return res.status(200).send({
      message: 'Success',
      data: results,
    })
  })
};

const deactivateUser = (req, res, next) => {
  userServices.deactivateUser(req.body, (error, results) => {
    if (error) {
      return next(error)
    }
    return res.status(200).send({
      message: 'Success',
      data: results,
    })
  })
}

module.exports = {
  login,
  register,
  userProfile,
  updateUser,
  deactivateUser,
}