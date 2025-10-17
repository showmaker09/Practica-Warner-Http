const{Profile}= require('..models/ProfileModel');
const {check}= require('express-validator ');

const validatorProfileCreate=
[
check('nombre').notEmpty().withMessage('este campo es obligatorio')

]