const { check, validationResult } = require("express-validator");


req = {
    "email": "a@gmail.com"
}

check("email", "Invalid Email").isEmail();

const errors = validationResult(req);
console.log(errors)