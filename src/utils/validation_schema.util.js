const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

class ValidationSchema{
    static signUpBodyValidation = (body) => {
        const schema = joi.object({
            userName: joi.string().required().label("User Name"),
            email: joi.string().email().required().label("Email"),
            password: passwordComplexity().required().label("Password"),
        });
        return schema.validate(body);
    };
    
    static logInBodyValidation = (body) => {
        const schema = joi.object({
            email: joi.string().email().required().label("Email"),
            password: joi.string().required().label("Password"),
        });
        return schema.validate(body);
    };
    
    static refreshTokenBodyValidation = (body) => {
        const schema = joi.object({
            refreshToken: joi.string().required().label("Refresh Token"),
        });
        return schema.validate(body);
    };
}

module.exports = ValidationSchema