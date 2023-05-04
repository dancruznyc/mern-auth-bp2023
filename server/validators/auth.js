const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required."),
  check("email").isEmail().withMessage("Valid Email required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 charachters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Valid Email required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 charachters long"),
];
